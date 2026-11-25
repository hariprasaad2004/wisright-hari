import { createContext, useCallback, useState } from 'react';
import authService from '../services/authService';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

/**
 * Provides authentication session state and login/logout actions via Context API.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getStoredSession());

  const login = useCallback((username, password) => {
    const sessionUser = authService.login(username, password);
    setUser(sessionUser);
    return sessionUser;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
