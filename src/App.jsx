import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import 'animate.css';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './context/AdminAuthContext';
import { routes } from './routes';

// Loading component for Suspense
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
  </div>
);

// Wrapper component to handle auth redirects
const AuthWrapper = ({ children }) => {
  const { admin: user, loading } = useAuth();
  const location = useLocation();

  // Don't render anything until initial auth check is complete
  if (loading) {
    return <Loading />;
  }

  // Only run the auth checks after initial load
  if (loading === false) {
    // If user is not authenticated and trying to access protected routes
    if (!user && location.pathname.startsWith('/admin') && !location.pathname.endsWith('/login')) {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    // If user is authenticated and on login page, redirect to dashboard
    if (user && location.pathname === '/admin/login') {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  return children;
};

// Recursive function to render routes and their children
const renderRoutes = (routes) => {
  return routes.map((route) => {
    if (route.children) {
      return (
        <Route 
          key={route.path} 
          path={route.path} 
          element={route.element}
        >
          {renderRoutes(route.children)}
        </Route>
      );
    }
    return (
      <Route
        key={route.path}
        path={route.path}
        element={route.element}
      />
    );
  });
};

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Toaster richColors position="bottom-right" />
      <AuthProvider>
        <Router>
          <AuthWrapper>
          <Suspense fallback={<Loading />}>
            <Routes>
              {renderRoutes(routes)}
              {/* Redirect any unknown routes to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
          </AuthWrapper>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
