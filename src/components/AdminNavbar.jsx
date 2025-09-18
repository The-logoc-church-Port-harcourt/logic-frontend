import React, { useState } from 'react';
import { useAuth } from '../context/AdminAuthContext';
import { LogOut, User, Menu, X, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
// Temporary logo
const logoImage = '/assets/image.webp';

const AdminNavbar = ({ onMenuToggle, isSidebarOpen }) => {
  const { admin: user, logout , logout: navigateOnLogout } = useAuth();
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigateOnLogout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setShowUserDropdown(false);
    }
  };

  return (
    <div className="bg-gray-900 border-b border-gray-700 w-full">
      <div className="px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Menu toggle and logo */}
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            >
              <span className="sr-only">
                {isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              </span>
              {isSidebarOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
            <Link to="/admin/dashboard" className="flex items-center ml-4">
              <img 
                src={logoImage} 
                alt="LOGIC Church Logo" 
                className="h-10 rounded border border-gray-700"
              />
            </Link>
          </div>

          {/* Right side - User menu */}
          <div className="flex items-center">
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="flex items-center max-w-xs rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded={showUserDropdown}
                  aria-haspopup="true"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center text-white font-medium">
                    {user?.name ? user.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                  </div>
                </button>
              </div>

              {/* Dropdown menu */}
              {showUserDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowUserDropdown(false)}
                  />
                  <div
                    className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <div className="px-4 py-2 border-b border-gray-700">
                      <p className="text-sm font-medium text-white">
                        {user?.name || 'Admin User'}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {user?.email || 'admin@example.com'}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      role="menuitem"
                      tabIndex="-1"
                    >
                      <LogOut className="mr-2 h-5 w-5" />
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;