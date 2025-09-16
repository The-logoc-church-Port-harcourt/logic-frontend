import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-20">
        <AdminNavbar 
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
          isSidebarOpen={isSidebarOpen} 
        />
      </header>
      
      <div className="flex flex-1 pt-16">
        <aside className={`fixed top-16 bottom-0 left-0 w-64 bg-gray-800 transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <Sidebar />
        </aside>
        
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;