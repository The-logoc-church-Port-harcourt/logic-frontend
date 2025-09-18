import { Outlet, useLocation } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {routes} from '../routes';
import { useEffect } from 'react';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const getCurrentRoute = () => {
  let currentRoute = routes.find(route => route.path === location.pathname);
  if (!currentRoute) {
    currentRoute = routes.find(route => {
      if (route.children && location.pathname.startsWith(route.path)) {
        return true;
      }
      return false;
    });
  }
  
  if (!currentRoute) {
    currentRoute = routes.find(route => route.path === '*');
  }
  
  return currentRoute;
};
  
  const currentRoute = getCurrentRoute();

  const showNavigation = currentRoute?.showInNav
  const showInFooter = currentRoute?.showInFooter
  const isAdmin = currentRoute?.isAdmin

  return (
    <>
    {!isAdmin && (
      <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-grey">
        {showNavigation && <Navbar />}
        <main className={`pl-0 mx-auto`}>
          <Outlet  />
        </main>
        {showInFooter && <Footer /> }
      </div>
    )}

    {isAdmin && (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        {showNavigation && (
          <header className="fixed top-0 left-0 right-0 z-20">
            <AdminNavbar 
              onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
              isSidebarOpen={isSidebarOpen} 
            />
          </header>
        )}
   
      <div className="flex" style={{
        paddingTop: !showNavigation ? "" : "16px"
      }}>
      {showNavigation && (
          <aside className={`fixed top-16 bottom-0 left-0 w-64 bg-gray-800 transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <Sidebar />
          </aside>
        )}
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-0' : 'ml-0'}`} style={{
          marginLeft: !showNavigation ? "" : "234px"
        }}>
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
    )}
    
    </>

  );
};

export default Layout;