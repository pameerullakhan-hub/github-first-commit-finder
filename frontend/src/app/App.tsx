import React from 'react';
import { Header } from '../components/layout/Header';
import { PageShell } from '../components/layout/PageShell';
import { HomePage } from '../pages/HomePage';

export const App: React.FC = () => {
  const handleReset = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('repo');
    window.history.pushState({}, '', url.toString());
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header onReset={handleReset} />
      <PageShell>
        <HomePage />
      </PageShell>
    </div>
  );
};

export default App;
