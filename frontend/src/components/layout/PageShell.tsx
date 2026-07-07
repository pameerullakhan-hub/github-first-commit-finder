import React, { useState, useEffect } from 'react';

interface PageShellProps {
  children: React.ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({ children }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Water-like Liquid Spotlight 1 (Mint - follows faster) */}
      <div 
        className="pointer-events-none fixed -z-20 h-[650px] w-[650px] rounded-full opacity-60 blur-[140px] transition-all duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(0, 245, 160, 0.12) 0%, rgba(0, 245, 160, 0.04) 50%, transparent 100%)',
          left: `${mousePos.x - 325}px`,
          top: `${mousePos.y - 325}px`,
          transform: 'translate3d(0, 0, 0)',
          display: isVisible ? 'block' : 'none',
        }}
      />

      {/* Water-like Liquid Spotlight 2 (Emerald - follows with lag for watery fluid sliding effect) */}
      <div 
        className="pointer-events-none fixed -z-20 h-[550px] w-[550px] rounded-full opacity-50 blur-[130px] transition-all duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.03) 60%, transparent 100%)',
          left: `${mousePos.x - 275}px`,
          top: `${mousePos.y - 275}px`,
          transform: 'translate3d(15px, 15px, 0)',
          display: isVisible ? 'block' : 'none',
        }}
      />

      {/* Default static glows for initial load or mobile/no-hover devices */}
      <div className="absolute top-[-5%] left-[-5%] -z-30 h-[600px] w-[600px] rounded-full bg-brand-purple/5 opacity-50 blur-[130px] animate-pulse-slow"></div>
      <div className="absolute bottom-[-5%] right-[-5%] -z-30 h-[600px] w-[600px] rounded-full bg-brand-cyan/5 opacity-40 blur-[130px] animate-pulse-slow"></div>

      <main className="mx-auto max-w-7xl relative z-10">
        {children}
      </main>
    </div>
  );
};
