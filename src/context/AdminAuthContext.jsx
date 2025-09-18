import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { setCookie, getCookie, removeCookie } from '../api/cookies';
import * as authService from '../api/auth';

const AuthContext = createContext(null);

// Create a custom hook that can be used by components that have access to router context
const useAuthNavigation = () => {
  const navigate = useNavigate();
  const { logout: contextLogout } = useAuth();
  
  const logout = useCallback(() => {
    contextLogout();
    navigate('/admin/login');
  }, [navigate, contextLogout]);
  
  return { logout };
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkAuth = useCallback(async () => {
    let isMounted = true;
    
    try {
      const token = getCookie('token');
      if (token) {
        const userData = await authService.getCurrentUser();
        if (isMounted) {
          setAdmin(userData.admin || userData.Admin);
        }
      } else {
        // If no token, make sure admin is set to null
        if (isMounted) {
          setAdmin(null);
        }
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      if (isMounted) {
        setError(err.response?.data?.message || 'Authentication failed');
        setAdmin(null); // Clear admin on error
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    checkAuth();
    // We can safely ignore the warning about checkAuth being a dependency
    // because it's wrapped in useCallback with no dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login(email, password);
      const { token, admin } = response;
      
      // Set token in cookies
      setCookie('token', token, { 
        expires: 7, // 7 days
        secure: window.location.protocol === 'https:',
        sameSite: 'strict'
      });
      
      setAdmin(admin);
      toast.success('Login successful');
      return true;
    } catch (err) {
      console.error('Login failed:', err);
      const errorMsg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      // Clear all authentication state
      removeCookie('token');
      setAdmin(null);
      setError(null);
      setLoading(false);
    }
  }, []);

  const isAuthenticated = useCallback(() => {
    return !!admin;
  }, [admin]);

  const value = {
    admin,
    loading,
    error,
    login,
    logout,
    isAuthenticated,
    setAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { useAuthNavigation };

export default AuthContext;
