import React , {useCallback, useContext, useState} from 'react';
import {setApiToken} from "./useApi";

const AuthContext = React.createContext();
AuthContext.displayName = 'AuthContext';

export function AuthContextProvider({children}) {
  const [authToken, setAuthToken] = useState(()=> {
    try{
      const token = JSON.parse(localStorage.getItem('auth'));
      if (token) {
        setApiToken(token);
      }
      return token;
    } catch (err) {
      return false;
    }
  });
  const [sessionUser, setSessionUser] = useState(()=> {
    try {
      return JSON.parse(localStorage.getItem('sessionUser'));
    } catch (err) {
      return false;
    }
  });

  const handleLoginResult = useCallback(
(loginResult) => {
        setApiToken(loginResult.token);
        setAuthToken(loginResult.token);
        setSessionUser(loginResult.user);

        localStorage.setItem('auth', JSON.stringify(loginResult.token));
        localStorage.setItem('sessionUser', JSON.stringify(loginResult.user.id));
      }, [setAuthToken,setSessionUser]
    );
  const logout = useCallback(
    () => {
      setApiToken(false);
      handleLoginResult({
          token: false,
          user: {}
        });
    }, [handleLoginResult]
  )
  return (
    <AuthContext.Provider value={{authToken, sessionUser, handleLoginResult,logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}