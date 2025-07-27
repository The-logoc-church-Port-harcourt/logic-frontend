import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import "animate.css"
import { Toaster } from 'sonner';
import Layout from './layouts/Layout';
import { routes } from './routes';

// Loading component for Suspense
const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
  </div>
);

// Recursive function to render routes and their children
const renderRoutes = (routes) => {
  return routes.map((route) => {
    if (route.children) {
      return (
        <Route key={route.path} path={route.path} element={route.element}>
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
    <>
    <Toaster richColors position='bottom-right' />
        <Router>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                {renderRoutes(routes)}
              </Route>
            </Routes>
          </Suspense>
        </Router>
    </>

  );
}

export default App;
