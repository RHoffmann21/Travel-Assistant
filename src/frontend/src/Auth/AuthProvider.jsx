import {
  createContext,
  useState,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';

import AuthService from './AuthService';

const AuthContext = createContext({ auth: { user: undefined }, setAuth: () => {} });

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: undefined });

  const navigate = useNavigate();

  useEffect(() => {
    AuthService
      .getProfile()
      .then((user) => {
        setAuth({ user });
      })
      .catch(() => {
        setAuth({ user: undefined });
        navigate('/auth-failure');
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