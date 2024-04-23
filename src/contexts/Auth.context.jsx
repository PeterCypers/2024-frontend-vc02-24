import {
    createContext,
    useState,
    useCallback,
    useEffect,
    useMemo,
    useContext,
  } from 'react';
  import useSWRMutation from 'swr/mutation';
  import * as api from '../api';
  
  const JWT_TOKEN_KEY = 'jwtToken';
  const GEBRUIKER_ID_KEY = 'gebruikerId';
  const GEBRUIKER_LETTER = 'gebruikerLetter';
  const AuthContext = createContext();
  
  export const useAuth = () => useContext(AuthContext);
  
  // eslint-disable-next-line react/prop-types
  export const AuthProvider = ({ children }) => {
    const [ready, setReady] = useState(false);
    const [isAuthed, setIsAuthed] = useState(false);
    const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
    const [gebruiker, setGebruiker] = useState(null);
    const [gebruikerLetter, setGebruikerLetter] = useState(localStorage.getItem(GEBRUIKER_LETTER));
  
    useEffect(() => {
      api.setAuthToken(token);
      setIsAuthed(Boolean(token));
      setReady(true);
    }, [token]);
  
    const {
      isMutating: loginLoading,
      error: loginError,
      trigger: doLogin,
    } = useSWRMutation('gebruikers/login', api.post);
  
    const setSession = useCallback(
      (token, gebruiker) => {
        setToken(token);
        setGebruiker(gebruiker);
        setGebruikerLetter(gebruiker.naam[0]);
  
        localStorage.setItem(JWT_TOKEN_KEY, token);
        localStorage.setItem(GEBRUIKER_ID_KEY, gebruiker.id);
        localStorage.setItem(GEBRUIKER_LETTER, gebruiker.naam[0]);
      },
      [],
    );
  
    const login = useCallback(
      async (email, wachtwoord) => {
        try {
          const { token, gebruiker } = await doLogin({
            email,
            wachtwoord,
          });
  
          setSession(token, gebruiker);
  
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      },
      [doLogin, setSession],
    );
  
    const logout = useCallback(() => {
      setToken(null);
      setGebruiker(null);
      setGebruikerLetter(null);
  
      localStorage.removeItem(JWT_TOKEN_KEY);
      localStorage.removeItem(GEBRUIKER_ID_KEY);
      localStorage.removeItem(GEBRUIKER_LETTER);
    }, []);
  
    const value = useMemo(
      () => ({
        token,
        gebruiker,
        gebruikerLetter,
        error: loginError,
        ready,
        loading: loginLoading,
        isAuthed,
        login,
        logout,
      }),
      [token, gebruiker, gebruikerLetter, loginError, ready, loginLoading, isAuthed, login, logout],
    );
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };