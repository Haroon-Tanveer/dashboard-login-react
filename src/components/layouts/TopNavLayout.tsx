import React from 'react';
import { Moon, Sun, ArrowLeftRight, Bell, User } from 'lucide-react';
import { useApp } from '../../store/AppContext';

interface TopNavLayoutProps {
  children: React.ReactNode;
}

export function TopNavLayout({ children }: TopNavLayoutProps) {
  const { state, toggleTheme, toggleDirection, logout } = useApp();

  return (
    <div className="min-h-screen bg-secondary-300 dark:bg-secondary-950">
      <nav className="bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-700 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              AdminPro
            </h1>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-lg transition-colors"
                aria-label="Toggle theme"
              >
                {state.theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-white" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={toggleDirection}
                className="p-2 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-lg transition-colors"
                aria-label="Toggle direction"
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>

              <button
                className="p-2 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-lg transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="relative group">
                <button
                  className="flex items-center gap-2 p-2 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-lg transition-colors"
                  aria-label="User menu"
                >
                  <User className="w-5 h-5" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-secondary-800 rounded-lg shadow-lg border border-secondary-200 dark:border-secondary-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-secondary-50 dark:hover:bg-secondary-700 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6">{children}</main>
    </div>
  );
}
