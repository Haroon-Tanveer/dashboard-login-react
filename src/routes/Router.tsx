import { useState, useEffect } from 'react';
import { useApp } from '../store/AppContext';
import { SidebarLayout } from '../components/layouts/SidebarLayout';
import { MinimalLayout } from '../components/layouts/MinimalLayout';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { ForgotPassword } from '../pages/ForgotPassword';
import { Dashboard } from '../pages/Dashboard';
import { Users } from '../pages/Users';
import { Projects } from '../pages/Projects';
import { Transactions } from '../pages/Transactions';
import { Settings } from '../pages/Settings';
import { Notifications } from '../pages/Notifications';
import { FileManager } from '../pages/FileManager';
import { ThemeCustomizer } from '../pages/ThemeCustomizer';
import { Calendar } from '../pages/Calendar';

export function Router() {
  const { state } = useApp();
  const [currentPath, setCurrentPath] = useState('/login');

  useEffect(() => {
    if (state.auth.isAuthenticated && currentPath === '/login') {
      setCurrentPath('/dashboard');
    } else if (!state.auth.isAuthenticated && !isPublicRoute(currentPath)) {
      setCurrentPath('/login');
    }
  }, [state.auth.isAuthenticated, currentPath]);

  const isPublicRoute = (path: string) => {
    return ['/login', '/register', '/forgot-password'].includes(path);
  };

  const navigate = (path: string) => {
    setCurrentPath(path);
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/login':
        return <Login onNavigate={navigate} />;
      case '/register':
        return <Register onNavigate={navigate} />;
      case '/forgot-password':
        return <ForgotPassword onNavigate={navigate} />;
      case '/dashboard':
        return <Dashboard />;
      case '/users':
        return <Users />;
      case '/projects':
        return <Projects />;
      case '/transactions':
        return <Transactions />;
      case '/settings':
        return <Settings />;
      case '/notifications':
        return <Notifications />;
      case '/files':
        return <FileManager />;
      case '/theme':
        return <ThemeCustomizer />;
      case '/calendar':
        return <Calendar />;
      default:
        return <Dashboard />;
    }
  };

  if (isPublicRoute(currentPath)) {
    return <MinimalLayout>{renderPage()}</MinimalLayout>;
  }

  return (
    <SidebarLayout currentPath={currentPath} onNavigate={navigate}>
      {renderPage()}
    </SidebarLayout>
  );
}
