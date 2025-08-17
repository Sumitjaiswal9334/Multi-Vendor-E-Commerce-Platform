import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 1,
    name: 'John Doe',
    email: 'john@example.com'
  });
  const [userRole, setUserRole] = useState('customer');

  const login = (email, password) => {
    // Mock login - in real app, this would make an API call
    setUser({
      id: 1,
      name: 'John Doe',
      email
    });
  };

  const logout = () => {
    setUser(null);
    setUserRole('customer');
  };

  const switchRole = (role) => {
    setUserRole(role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        login,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};