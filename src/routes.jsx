import { lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import ProtectedRoute from './middleware/Protectedroute';

// Public components
const NotFound = lazy(() => import('./pages/NotFound'))
const HomeIndex = lazy(() => import('./pages/home/Index'))
const EventsHome = lazy(() => import('./pages/home/Event'))
const About = lazy(() => import('./pages/home/About'))
const TrainingsIndex = lazy(() => import('./pages/trainings/Index'))
const LFC = lazy(() => import('./pages/trainings/LFC'))
const LDC = lazy(() => import('./pages/trainings/LDC'))
const AdminLogin = lazy(() => import('./pages/auth/Login'))
const Forum = lazy(() => import('./pages/forum/Forum'))
const Signup = lazy(() => import('./pages/forum/Signup'))
const ForumLogin = lazy(() => import('./pages/forum/Login'))

// Admin components
const AdminLayout = lazy(() => import('./layouts/AdminLayout'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const AdminManagement = lazy(() => import('./pages/admin/AdminManagement'))
const EventSetting = lazy(() => import('./pages/admin/EventSetting'))
const Gallery = lazy(() => import('./pages/admin/Gallery'))
const Posts = lazy(() => import('./pages/admin/Posts'))

// Main routes configuration
export default [
  // 👇 PUBLIC ROUTES
  {
    path: '/',
    element: <HomeIndex />,
    name: 'Home',
    showInNav: true,
    showInFooter: true,
  },
  {
    path: '/about',
    element: <About />,
    name: 'About',
    showInNav: true,
    showInFooter: true,
  },
  {
    path: '/trainings',
    element: <TrainingsIndex />,
    name: 'Trainings',
    showInNav: true,
    showInFooter: true,
  },
  {
    path: '/trainings/lfc',
    element: <LFC />,
    name: 'LFC',
    showInNav: true,
    showInFooter: true,
  },
  {
    path: '/trainings/ldc',
    element: <LDC />,
    name: 'LDC',
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
    path: '/forum/signup',
    element: <Signup />,
    name: 'Forum Signup',
    showInNav: false,
    showInFooter: false,
  },
  {
    path: '/forum',
    element: <Forum />,
    name: 'Forum',
    showInNav: false,
    showInFooter: false,
  },

  // 👇 ADMIN LOGIN
  {
    path: '/admin/login',
    element: <AdminLogin />,
    name: 'Admin Login',
    showInNav: false,
    showInFooter: false,
  },
  {
    path: '/forum/login',
    element: <ForumLogin />,
    name: 'Forum Login',
    showInNav: false,
    showInFooter: false,
  },

  // 👇 ADMIN PROTECTED ROUTES
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout>
          <Outlet />
        </AdminLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        name: 'Dashboard',
        showInNav: true,
        showInFooter: false,
        isAdmin: true,
      },
      {
        path: 'admins',
        element: <AdminManagement />,
        name: 'Admins',
        showInNav: true,
        showInFooter: false,
        isAdmin: true,
      },
      {
        path: 'events',
        element: <EventSetting />,
        name: 'Events',
        showInNav: true,
        showInFooter: false,
        isAdmin: true,
      },
      {
        path: 'gallery',
        element: <Gallery />,
        name: 'Gallery',
        showInNav: true,
        showInFooter: false,
        isAdmin: true,
      },
      {
        path: 'posts',
        element: <Posts />,
        name: 'Posts',
        showInNav: true,
        showInFooter: false,
        isAdmin: true,
      },
    ],
  },

  // 👇 CATCH-ALL
  {
    path: '*',
    element: <NotFound />,
    name: 'Not Found',
    showInNav: false,
  },
]

