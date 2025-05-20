import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import useAuthStore from '../store/authStore';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, logout } = useAuthStore();
  const [darkMode, setDarkMode] = React.useState(() => 
    document.documentElement.classList.contains('dark')
  );
  const location = useLocation();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', (!darkMode).toString());
  };

  React.useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Resume', href: '/resume' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-2xl font-bold text-primary-600">
                  Portfolio
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      location.pathname === item.href
                        ? 'border-primary-500 text-gray-900 dark:text-white'
                        : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {darkMode ? (
                  <SunIcon className="h-6 w-6" />
                ) : (
                  <MoonIcon className="h-6 w-6" />
                )}
              </button>
              {user ? (
                <div className="flex items-center space-x-4">
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      className="text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => logout()}
                    className="text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 