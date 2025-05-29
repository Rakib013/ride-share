import React, { createContext, ReactNode } from 'react';
import { useAuth as useAuthHook } from '../hooks/useAuth';

// Get the return type of the useAuth hook
type AuthContextType = ReturnType<typeof useAuthHook>;

// Create a context with a default value
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  loading: false
});

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useAuthHook();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}; 