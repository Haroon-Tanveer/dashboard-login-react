import React from 'react';
import { Sidebar } from './Sidebar';

interface SidebarLayoutProps {
  children: React.ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function SidebarLayout({ children, currentPath, onNavigate }: SidebarLayoutProps) {
  return (
    <div className="flex min-h-screen bg-secondary-50 dark:bg-secondary-950">
      <Sidebar currentPath={currentPath} onNavigate={onNavigate} />
      <main className="flex-1 overflow-x-hidden">
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  );
}
