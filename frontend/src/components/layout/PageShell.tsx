import React from 'react';

interface PageShellProps {
  children: React.ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({ children }) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-brand-purple/5 opacity-50 blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-brand-cyan/5 opacity-30 blur-[120px] animate-pulse-slow"></div>

      <main className="mx-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
};
