import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('customer');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Demo users database
  const demoUsers = {
    'customer@demo.com': {
      id: 1,
      name: 'John Customer',
      email: 'customer@demo.com',
      role: 'customer',
      password: 'password123'
    },
    'vendor@demo.com': {
      id: 2,
      name: 'Jane Vendor',
      email: 'vendor@demo.com',
      role: 'vendor',
      password: 'password123',
      businessName: 'TechStore Pro'
    },
    'admin@demo.com': {
      id: 3,
      name: 'Admin User',
      email: 'admin@demo.com',
      role: 'admin',
      password: 'password123'
    }
  };

  const login = async (email, password, role) => {
    // Mock login - in real app, this would make an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const demoUser = demoUsers[email];
        
        if (!demoUser) {
          reject(new Error('User not found'));
          return;
        }
        
        if (demoUser.password !== password) {
          reject(new Error('Invalid password'));
          return;
        }
        
        if (demoUser.role !== role) {
          reject(new Error(`This account is not registered as a ${role}`));
          return;
        }
        
        const { password: _, ...userWithoutPassword } = demoUser;
        setUser(userWithoutPassword);
        setUserRole(role);
        setIsAuthenticated(true);
        
        // Store in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        localStorage.setItem('userRole', role);
        
        resolve(userWithoutPassword);
      }, 1000); // Simulate API delay
    });
  };

  const register = async (userData) => {
    // Mock registration - in real app, this would make an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists
        if (demoUsers[userData.email]) {
          reject(new Error('User already exists with this email'));
          return;
        }
        
        const newUser = {
          id: Date.now(),
          name: userData.name,
          email: userData.email,
          role: userData.role,
          businessName: userData.businessName,
          phone: userData.phone
        };
        
        // In a real app, you'd save this to your database
        demoUsers[userData.email] = { ...newUser, password: userData.password };
        
        const { password: _, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        setUserRole(userData.role);
        setIsAuthenticated(true);
        
        // Store in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        localStorage.setItem('userRole', userData.role);
        
        resolve(userWithoutPassword);
      }, 1000); // Simulate API delay
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setUserRole('customer');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
  };

  const switchRole = (role) => {
    if (!isAuthenticated) return;
    setUserRole(role);
    localStorage.setItem('userRole', role);
  };

  // Check for stored authentication on app load
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('userRole');
    
    if (storedUser && storedRole) {
      setUser(JSON.parse(storedUser));
      setUserRole(storedRole);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        isAuthenticated,
        login,
        register,
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