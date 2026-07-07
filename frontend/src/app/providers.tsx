import React from 'react';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  // Pass-through wrapper for potential future providers (Theme, QueryClient, etc.)
  return <>{children}</>;
};
