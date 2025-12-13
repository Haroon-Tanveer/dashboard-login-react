import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  FileText,
  Settings,
  Bell,
  FolderOpen,
  Palette,
  Calendar,
  Menu,
  X,
  Moon,
  Sun,
  ArrowLeftRight,
} from 'lucide-react';
import { useApp } from '../../store/AppContext';

interface NavItem {
  name: string;
  icon: React.ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard' },
  { name: 'Users', icon: <Users className="w-5 h-5" />, path: '/users' },
  { name: 'Projects', icon: <FolderKanban className="w-5 h-5" />, path: '/projects' },
  { name: 'Transactions', icon: <FileText className="w-5 h-5" />, path: '/transactions' },
  { name: 'Notifications', icon: <Bell className="w-5 h-5" />, path: '/notifications' },
  { name: 'Files', icon: <FolderOpen className="w-5 h-5" />, path: '/files' },
  { name: 'Calendar', icon: <Calendar className="w-5 h-5" />, path: '/calendar' },
  { name: 'Theme', icon: <Palette className="w-5 h-5" />, path: '/theme' },
  { name: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/settings' },
];

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function Sidebar({ currentPath, onNavigate }: SidebarProps) {
  const { state, toggleSidebar, toggleTheme, toggleDirection } = useApp();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setIsMobileOpen(false);
  };

  return (
    <>
    {/* menu button  */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-secondary-400 dark:bg-secondary-800 rounded-lg shadow-md"
        aria-label="Toggle mobile menu"
      >
        {isMobileOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-white dark:bg-secondary-900 border-r border-secondary-200 dark:border-secondary-700 transition-all duration-300 z-40
          ${state.layout.sidebarCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-secondary-200 dark:border-secondary-700">
            {!state.layout.sidebarCollapsed && (
              <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">
                AdminPro
              </h1>
            )}
            <button
              onClick={toggleSidebar}
              className="mx-2 p-2 bg-secondary  dark:hover:bg-secondary-800 rounded-lg transition-colors"
              aria-label={state.layout.sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Menu className="w-5 h-5 text-black  dark:text-white " />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4" role="navigation">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => handleNavClick(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                      ${
                        currentPath === item.path
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                          : 'text-secondary-600 hover:bg-secondary-100 dark:text-secondary-400 dark:hover:bg-secondary-800'
                      }
                      ${state.layout.sidebarCollapsed ? 'justify-center' : ''}
                    `}
                    title={state.layout.sidebarCollapsed ? item.name : undefined}
                  >
                    {item.icon}
                    {!state.layout.sidebarCollapsed && (
                      <span className="font-medium">{item.name}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-secondary-200 dark:border-secondary-700 space-y-2">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-secondary-600 hover:bg-secondary-100 dark:text-secondary-400 dark:hover:bg-secondary-800 transition-colors"
              title={state.layout.sidebarCollapsed ? 'Toggle theme' : undefined}
            >
              {state.theme === 'dark' ? (
                <Sun className="w-5 h-5 text-white " />
              ) : (
                <Moon className="w-5 h-5" />
              )}
              {!state.layout.sidebarCollapsed && (
                <span className="font-medium">
                  {state.theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </span>
              )}
            </button>

            <button
              onClick={toggleDirection}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-secondary-600 hover:bg-secondary-100 dark:text-secondary-400 dark:hover:bg-secondary-800 transition-colors"
              title={state.layout.sidebarCollapsed ? 'Toggle direction' : undefined}
            >
              <ArrowLeftRight className="w-5 h-5 " />
              {!state.layout.sidebarCollapsed && (
                <span className="font-medium">
                  {state.layout.direction === 'ltr' ? 'RTL' : 'LTR'}
                </span>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
