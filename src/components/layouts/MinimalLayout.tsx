import React from 'react';

interface MinimalLayoutProps {
  children: React.ReactNode;
}

export function MinimalLayout({ children }: MinimalLayoutProps) {
  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 flex items-center justify-center p-4">
      {children}
    </div>
  );
}
