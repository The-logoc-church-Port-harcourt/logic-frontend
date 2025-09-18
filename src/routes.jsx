import { lazy, Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import ProtectedRoute from './middleware/Protectedroute';

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

export const routes = [
  // Public routes
  {
    path: '/',
    element: <HomeIndex />,
    name: 'Home',
    showInNav: true,
    showInFooter: true,
  },
  {
    path: '/events',
    element: <EventsHome />,
    name: 'Events',
    showInNav: true,
    showInFooter: true,
  },
   {
    path: '/admin',
    element:  <Navigate to="/admin/dashboard" replace />,
    name: 'Admin',
    showInNav: false,
    showInFooter: false,
  },
  {
    path: '/admin/dashboard',
    element: <ProtectedRoute><Dashboard /></ProtectedRoute> ,
    name: 'Dashboard',
    showInNav: true,
    showInFooter: false,
    isAdmin: true
  },
  {
    path: '/login',
    element: <Navigate to="/" replace />,
    name: 'Login Redirect',
    showInNav: false,
    showInFooter: false,
  },
  {
    path: '/admin/login',
    element:  <Login />,
    name: 'Login ',
    showInNav: false,
    showInFooter: false,
    isAdmin: true
  },
  {
    path: '/admin/admins',
    element: <ProtectedRoute><AdminManagement /></ProtectedRoute> ,
    name: 'Admins ',
    showInNav: true,
    showInFooter: false,
    isAdmin: true
  },
  {
    path: '/admin/events',
    element: <EventSetting />,
    name: 'Events',
    showInNav: true,
    showInFooter: false,
    isAdmin: true
  },
  {
    path: '/admin/gallery',
    element: <Gallery />,
    name: 'Gallery',
    showInNav: true,
    showInFooter: false,
    isAdmin: true
  },
  {
    path: '*',
    element: <NotFound />,
    name: 'Not Found',
    showInNav: false,
  },
];
