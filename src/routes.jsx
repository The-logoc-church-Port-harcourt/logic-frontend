import { lazy } from 'react';
import { Navigate } from 'react-router';

const NotFound = lazy(() => import('./pages/NotFound'));
const HomeIndex = lazy(() => import('./pages/home/Index'));

export const routes = [
  {
    path: '/',
    element: <HomeIndex />,
    name: 'Home',
    showInNav: false,
  },
  
  {
    path: '*',
    element: <NotFound />,
    name: 'Not Found',
    showInNav: false,
  },
];
