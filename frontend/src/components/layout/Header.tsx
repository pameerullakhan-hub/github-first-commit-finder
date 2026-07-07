import React from 'react';
import { GitBranch, Activity, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4 pb-2 sm:px-6 lg:px-8 bg-background/10 backdrop-blur-md border-b border-brand-cyan/10">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-6 rounded-2xl border border-brand-cyan/20 bg-card backdrop-blur-xl shadow-lg shadow-brand-cyan/[0.03]">
        
        {/* Brand Logo / Home trigger */}
        <div 
          onClick={onReset}
          className="flex cursor-pointer items-center space-x-3 transition-all hover:scale-105 active:scale-95"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-cyan to-brand-purple p-0.5 shadow-lg shadow-brand-cyan/20">
            <div className="flex h-full w-full items-center justify-center rounded-[9px] bg-background">
              <GitBranch className="h-5.5 w-5.5 text-brand-cyan animate-pulse-slow" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-white tracking-tight text-lg leading-none">GENESIS</span>
            <span className="text-brand-cyan font-bold text-[10px] tracking-widest mt-1 uppercase">
              Commit Engine
            </span>
          </div>
        </div>

        {/* Navigation & Active Nodes (Aesthetic dashboard metrics) */}
        <div className="flex items-center space-x-6">
          <div className="hidden sm:flex items-center space-x-1.5 text-xs text-zinc-400 font-semibold uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4 text-brand-cyan" />
            <span>Secure Node Connection</span>
          </div>
          
          <div className="flex items-center space-x-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-2 text-xs text-emerald-400 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Activity className="h-4 w-4 opacity-75 ml-0.5" />
            <span className="font-extrabold tracking-wider uppercase text-[10px]">API Node Active</span>
          </div>
        </div>

      </div>
    </header>
  );
};
