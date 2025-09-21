import React, { useEffect, useState, createContext } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

// Hardcoded admin credentials (for demo purposes only)
const ADMIN_CREDENTIALS = {
  email: 'admin@logic.church',
  password: 'admin123'
};

// Create auth context
export const AuthContext = createContext({
  isAuthenticated: false,
  logout: () => {}
});

const ProtectedRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Check if user is authenticated in session storage
        const storedAuth = sessionStorage.getItem('adminAuth');
        if (storedAuth) {
          const { email, password } = JSON.parse(storedAuth);
          if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Handle login
  const handleLogin = (email, password) => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      sessionStorage.setItem('adminAuth', JSON.stringify({ email, password }));
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
  };

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin h-12 w-12 text-red-600 mb-4" />
          <p className="text-gray-400">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login with return location
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child routes with auth context
  return (
    <AuthContext.Provider value={{ isAuthenticated: true, logout: handleLogout }}>
      <Outlet context={{ login: handleLogin }} />
    </AuthContext.Provider>
  );
};

export default ProtectedRoute;
