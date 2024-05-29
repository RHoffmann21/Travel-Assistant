import {
  createContext,
  useState,
  useEffect,
} from 'react';

import AuthService from './AuthService';

const AuthContext = createContext({ auth: { user: undefined }, setAuth: () => {} });

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: undefined });

  useEffect(() => {
    AuthService
      .getUser()
      .then((user) => {
        setAuth({ user });
      })
      .catch(() => {
        const newURL = document.createElement('a');
        newURL.href = '/api/auth/login';
        document.body.appendChild(newURL);
        newURL.click();
        setAuth({ user: undefined });
      });
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
export default AuthContext;