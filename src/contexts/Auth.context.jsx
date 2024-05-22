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
  const [gebruikerId, setGebruikerId] = useState(localStorage.getItem(GEBRUIKER_ID_KEY));

  const [tokenIsExpired, setTokenIsExpired] = useState(false);

  useEffect(() => {
    api.setAuthToken(token);
    setIsAuthed(Boolean(token));
    setReady(true);
  }, [token]);

  useEffect(() => {
    api.setExpiryAction(logout);
  }, []);

  const {
    isMutating: loginLoading,
    error: loginError,
    trigger: doLogin,
  } = useSWRMutation('gebruikers/login', api.post);

  const {
    trigger: doNotificatiesUpdate,
  } = useSWRMutation(`notificaties`, api.post);

  useEffect(() => {
    (async () => {
      if (!isAuthed) {
        return;
      }

      try {
        await doNotificatiesUpdate();
      } catch (error) {
        console.error(error);
      }
    })();
  }, [isAuthed]);

  const {
    trigger: doMaakOngelezen
  } = useSWRMutation('notificaties/maakOngelezen', api.post);

  const setNieuwNotificatiesOngelezen = useCallback(
    async () => {
      try {
        await doMaakOngelezen();
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doMaakOngelezen],
  );

  const logout = useCallback(() => {
    if (isAuthed) {
      setNieuwNotificatiesOngelezen();
    }

    setToken(null);
    setGebruiker(null);
    setGebruikerId(null);
    setGebruikerLetter(null);
    setGebruikerRol(null);

    localStorage.removeItem(JWT_TOKEN_KEY);
    localStorage.removeItem(GEBRUIKER_ID_KEY);
    localStorage.removeItem(GEBRUIKER_LETTER);
    localStorage.removeItem(GEBRUIKER_ROL);

    setTokenIsExpired(true);
  }, [isAuthed]);

  const setSession = useCallback(
    (token, gebruiker) => {
      setToken(token);
      setTokenIsExpired(false);
      setGebruiker(gebruiker);
      setGebruikerLetter(gebruiker.naam[0]);
      setGebruikerRol(gebruiker.rol);
      setGebruikerId(gebruiker.id);

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

        if (gebruiker.rol == "ADMINISTRATOR") {
          throw Error("Administrators kunnen niet inloggen.");
        }

        setSession(token, gebruiker);

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doLogin, setSession],
  );

  const value = useMemo(
    () => ({
      token,
      gebruiker,
      gebruikerId,
      gebruikerLetter,
      gebruikerRol,
      error: loginError,
      ready,
      loading: loginLoading,
      isAuthed,
      tokenIsExpired,
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