import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AdminAuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ 
  children, 
  adminOnly = false,
  requiredRoles = ['admin', 'superadmin'] // Default required roles for admin routes
}) => {
  const { admin: user, loading, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle authentication state changes
  useEffect(() => {
    // If not loading and not authenticated, redirect to login
    if (!loading && !isAuthenticated() && location.pathname !== '/login') {
      navigate('/login', { 
        state: { from: location },
        replace: true 
      });
    }
  }, [loading, isAuthenticated, location, navigate]);

  // Show loading spinner while checking auth state
  if (loading || (user === null && isAuthenticated())) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-red-500" />
          <p className="text-gray-400">Verifying your session...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated()) {
    return (
      <Navigate 
        to="/login" 
        state={{ 
          from: location,
          message: 'Please sign in to access this page.'
        }} 
        replace 
      />
    );
  }

  // Check if admin access is required and user has the required role
  if (adminOnly && user && !requiredRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h2>
          <p className="text-gray-300 mb-6">
            You don't have permission to access this page. Please contact an administrator if you believe this is an error.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // If authenticated and authorized, render the children
  return children;
};

export default ProtectedRoute;
