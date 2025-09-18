import { lazy, Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Preloader from "./components/Proloader"

// Public components
const NotFound = lazy(() => import('./pages/NotFound'));
const HomeIndex = lazy(() => import('./pages/home/Index'));
const EventsHome = lazy(() => import('./pages/home/Event'));
const Login = lazy(() => import('./pages/auth/Login'));

// Admin components
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminManagement = lazy(() => import('./pages/admin/AdminManagement'));
const EventSetting = lazy(() => import('./pages/admin/EventSetting'));
const Gallery = lazy(() => import('./pages/admin/Gallery'));



// Admin Layout Wrapper
const AdminRoute = () => (
  <ProtectedRoute adminOnly={true}>
    <AdminLayout>
      <Suspense fallback={<Preloader />}>
        <Outlet />
      </Suspense>
    </AdminLayout>
  </ProtectedRoute>
);

// Public Layout Wrapper
const PublicLayout = ({ children }) => (
  <>
    <Suspense fallback={<Preloader />}>
      {children}
    </Suspense>
  </>
);

export const routes = [
  // Public routes
  {
    path: '/',
    element: <PublicLayout><HomeIndex /></PublicLayout>,
    name: 'Home',
    showInNav: true,
  },
  {
    path: '/events',
    element: <PublicLayout><EventsHome /></PublicLayout>,
    name: 'Events',
    showInNav: true,
  },
  // Redirect old login URL to new admin login
  {
    path: '/login',
    element: <Navigate to="/admin/login" replace />,
    name: 'Login Redirect',
    showInNav: false,
  },
  
  // Admin routes
  {
    path: '/admin',
    children: [
      // Login route - public
      {
        path: 'login',
        element: <Login />,
        name: 'Login',
        showInNav: false,
      },
      // All other admin routes - protected
      {
        path: '*',
        element: <AdminRoute />,
        children: [
          // Redirect /admin to /admin/dashboard
          {
            path: '',
            element: <Navigate to="dashboard" replace />,
          },
          // Dashboard
          {
            path: 'dashboard',
            element: <Dashboard />,
            name: 'Dashboard',
            showInNav: true,
            icon: 'dashboard',
          },
          // Admin Management
          {
            path: 'admins',
            element: <AdminManagement />,
            name: 'Admins',
            showInNav: true,
            icon: 'users',
            adminOnly: true,
          },
          // Events Management
          {
            path: 'events',
            element: <EventSetting />,
            name: 'Events',
            showInNav: true,
            icon: 'calendar',
          },
          // Gallery Management
          {
            path: 'gallery',
            element: <Gallery />,
            name: 'Gallery',
            showInNav: true,
            icon: 'image',
          },
        ],
      },
    ],
  },
  // 404 - Not Found (must be last)
  {
    path: '*',
    element: <PublicLayout><NotFound /></PublicLayout>,
    name: 'Not Found',
    showInNav: false,
  },
];
