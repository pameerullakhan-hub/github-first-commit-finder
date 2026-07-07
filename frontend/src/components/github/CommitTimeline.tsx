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
    <div className="mx-auto w-full max-w-5xl space-y-6 pt-6">
      
      {/* Section Title */}
      <div>
        <h3 className="text-lg font-bold text-white tracking-tight flex items-center">
          <Activity className="h-4 w-4 mr-2 text-brand-cyan animate-pulse-slow" />
          Repository Journey Timeline
        </h3>
        <p className="text-xs text-zinc-500 font-light mt-0.5">
          Visual progression from repository creation to its current active state.
        </p>
      </div>

      {/* Timeline Glass Card */}
      <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
        
        {/* Timeline Line Container */}
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-4 md:px-12 py-4">
          
          {/* Connector Line (hidden on mobile, shown on desktop) */}
          <div className="hidden md:block absolute top-[43px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-brand-cyan via-brand-purple to-zinc-800 -z-10"></div>
          
          {/* Step 1: Genesis Commit */}
          <div className="flex flex-row md:flex-col items-center md:items-center text-left md:text-center space-x-4 md:space-x-0 md:space-y-3 relative z-10 w-full md:w-1/3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background border-2 border-brand-cyan shadow-[0_0_15px_rgba(0,242,254,0.3)] shrink-0">
              <GitCommit className="h-6 w-6 text-brand-cyan" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest block">
                Genesis (Commit #1)
              </span>
              <span className="text-white font-semibold text-sm block mt-0.5">
                Repository Spawned
              </span>
              <span className="text-zinc-500 text-xs font-light block mt-0.5">
                {new Date(commit.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>

          {/* Step 2: Intermediate Milestone */}
          <div className="flex flex-row md:flex-col items-center md:items-center text-left md:text-center space-x-4 md:space-x-0 md:space-y-3 relative z-10 w-full md:w-1/3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background border-2 border-brand-purple shadow-[0_0_15px_rgba(127,0,255,0.2)] shrink-0">
              <Milestone className="h-5 w-5 text-brand-purple" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-brand-purple uppercase tracking-widest block">
                Initial Design
              </span>
              <span className="text-white font-semibold text-sm block mt-0.5">
                Source Code Pushed
              </span>
              <span className="text-zinc-500 text-xs font-light block mt-0.5">
                {commit.message.substring(0, 30)}
                {commit.message.length > 30 ? '...' : ''}
              </span>
            </div>
          </div>

          {/* Step 3: Current State */}
          <div className="flex flex-row md:flex-col items-center md:items-center text-left md:text-center space-x-4 md:space-x-0 md:space-y-3 relative z-10 w-full md:w-1/3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background border-2 border-zinc-700 shadow-lg shrink-0">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                Current Status
              </span>
              <span className="text-white font-semibold text-sm block mt-0.5">
                Active & Public
              </span>
              <span className="text-zinc-500 text-xs font-light block mt-0.5">
                {repoInfo.stars.toLocaleString()} Stars • {repoInfo.default_branch} branch
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
