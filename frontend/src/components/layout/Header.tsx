import React from 'react';
import { GitBranch, Activity } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/30 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div 
          onClick={onReset}
          className="flex cursor-pointer items-center space-x-3 transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-cyan to-brand-purple p-0.5 shadow-lg shadow-brand-cyan/10">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-background">
              <GitBranch className="h-5 w-5 text-brand-cyan animate-pulse-slow" />
            </div>
          </div>
          <div>
            <span className="font-bold text-white tracking-tight text-lg">Genesis</span>
            <span className="text-brand-cyan font-semibold text-xs ml-1 bg-brand-cyan/10 px-2 py-0.5 rounded-full border border-brand-cyan/20">
              Commit Finder
            </span>
          </div>
        </div>

        {/* Backend Status indicator */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 rounded-full border border-emerald-500/10 bg-emerald-500/5 px-3 py-1 text-xs text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Activity className="h-3.5 w-3.5 opacity-60 ml-0.5" />
            <span className="font-medium tracking-wide">Network Node Active</span>
          </div>
        </div>

      </div>
    </header>
  );
};
