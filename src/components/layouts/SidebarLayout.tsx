import React from 'react';
import { Sidebar } from './Sidebar';

interface SidebarLayoutProps {
  children: React.ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function SidebarLayout({ children, currentPath, onNavigate }: SidebarLayoutProps) {
  return (
    <div className="flex min-h-screen bg-secondary-300 dark:bg-zinc-900">
      <Sidebar currentPath={currentPath} onNavigate={onNavigate} />
      <main className="flex-1 overflow-x-hidden">
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  );
}
