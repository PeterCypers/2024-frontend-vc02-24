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
  const GEBRUIKER_ROL = 'gebruikerRol';
  const AuthContext = createContext();
  
  export const useAuth = () => useContext(AuthContext);
  
  export const AuthProvider = ({ children }) => {
    const [ready, setReady] = useState(false);
    const [isAuthed, setIsAuthed] = useState(false);
    const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
    const [gebruiker, setGebruiker] = useState(null);
    const [gebruikerLetter, setGebruikerLetter] = useState(localStorage.getItem(GEBRUIKER_LETTER));
    const [gebruikerRol, setGebruikerRol] = useState(localStorage.getItem(GEBRUIKER_ROL));
  
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
        setGebruikerRol(gebruiker.rol);
  
        localStorage.setItem(JWT_TOKEN_KEY, token);
        localStorage.setItem(GEBRUIKER_ID_KEY, gebruiker.id);
        localStorage.setItem(GEBRUIKER_LETTER, gebruiker.naam[0]);
        localStorage.setItem(GEBRUIKER_ROL, gebruiker.rol);
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
      setGebruikerRol(null);
  
      localStorage.removeItem(JWT_TOKEN_KEY);
      localStorage.removeItem(GEBRUIKER_ID_KEY);
      localStorage.removeItem(GEBRUIKER_LETTER);
      localStorage.removeItem(GEBRUIKER_ROL);
    }, []);
  
    const value = useMemo(
      () => ({
        token,
        gebruiker,
        gebruikerLetter,
        gebruikerRol,
        error: loginError,
        ready,
        loading: loginLoading,
        isAuthed,
        login,
        logout,
      }),
      [token, gebruiker, gebruikerLetter, gebruikerRol, loginError, ready, loginLoading, isAuthed, login, logout],
    );
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };