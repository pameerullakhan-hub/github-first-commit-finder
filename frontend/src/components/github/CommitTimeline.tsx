import React from 'react';
import { CommitDetail, RepositoryInfo } from '../../features/first-commit/types';
import { formatDate } from '../../features/first-commit/utils';
import { GitCommit, Milestone, Activity } from 'lucide-react';

interface CommitTimelineProps {
  commit: CommitDetail;
  repoInfo: RepositoryInfo;
}

export const CommitTimeline: React.FC<CommitTimelineProps> = ({
  commit,
  repoInfo
}) => {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 pt-8 border-t border-white/5">
      
      {/* Section Title */}
      <div>
        <h3 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center">
          <Activity className="h-5 w-5 mr-2.5 text-brand-cyan animate-pulse-slow shrink-0" />
          Repository Journey Timeline
        </h3>
        <p className="text-sm text-zinc-400 font-normal mt-1 leading-relaxed">
          Visual progression from repository creation to its current active state.
        </p>
      </div>

      {/* Timeline Glass Card */}
      <div className="glass-card rounded-3xl p-8 relative overflow-hidden border border-white/10">
        
        {/* Timeline Line Container */}
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-10 md:gap-6 md:px-8 py-6">
          
          {/* Connector Line (hidden on mobile, shown on desktop) */}
          <div className="hidden md:block absolute top-[53px] left-[15%] right-[15%] h-[3px] bg-gradient-to-r from-brand-cyan via-brand-purple to-zinc-800 -z-10"></div>
          
          {/* Step 1: Genesis Commit */}
          <div className="flex flex-row md:flex-col items-center md:items-center text-left md:text-center space-x-5 md:space-x-0 md:space-y-4 relative z-10 w-full md:w-1/3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background border-3 border-brand-cyan shadow-[0_0_20px_rgba(0,242,254,0.4)] shrink-0">
              <GitCommit className="h-8 w-8 text-brand-cyan" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-black text-brand-cyan uppercase tracking-widest block">
                Genesis (Commit #1)
              </span>
              <span className="text-white font-extrabold text-base sm:text-lg block mt-1">
                Repository Spawned
              </span>
              <span className="text-zinc-300 text-sm font-semibold block mt-1">
                {new Date(commit.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>

          {/* Step 2: Intermediate Milestone */}
          <div className="flex flex-row md:flex-col items-center md:items-center text-left md:text-center space-x-5 md:space-x-0 md:space-y-4 relative z-10 w-full md:w-1/3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background border-3 border-brand-purple shadow-[0_0_20px_rgba(127,0,255,0.3)] shrink-0">
              <Milestone className="h-7 w-7 text-brand-purple" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-black text-brand-purple uppercase tracking-widest block">
                Initial Design
              </span>
              <span className="text-white font-extrabold text-base sm:text-lg block mt-1">
                Source Code Pushed
              </span>
              <span className="text-zinc-300 text-sm font-medium block mt-1 italic break-words max-w-[240px] mx-auto">
                "{commit.message.substring(0, 45)}
                {commit.message.length > 45 ? '...' : ''}"
              </span>
            </div>
          </div>

          {/* Step 3: Current State */}
          <div className="flex flex-row md:flex-col items-center md:items-center text-left md:text-center space-x-5 md:space-x-0 md:space-y-4 relative z-10 w-full md:w-1/3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background border-3 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] shrink-0">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-black text-emerald-400 uppercase tracking-widest block">
                Current Status
              </span>
              <span className="text-white font-extrabold text-base sm:text-lg block mt-1">
                Active & Public
              </span>
              <span className="text-zinc-300 text-sm font-semibold block mt-1">
                {repoInfo.stars.toLocaleString()} Stars • {repoInfo.default_branch} branch
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
