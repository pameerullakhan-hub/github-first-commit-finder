import React, { useState } from 'react';
import { CommitDetail, RepositoryInfo } from '../../features/first-commit/types';
import { formatDate, formatTimeAgo } from '../../features/first-commit/utils';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  Star, 
  GitFork, 
  Code, 
  Calendar, 
  Share2,
  FileCode2,
  User,
  Quote
} from 'lucide-react';

interface CommitResultCardProps {
  commit: CommitDetail;
  repoInfo: RepositoryInfo;
}

export const CommitResultCard: React.FC<CommitResultCardProps> = ({
  commit,
  repoInfo
}) => {
  const [copiedSha, setCopiedSha] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const handleCopySha = () => {
    navigator.clipboard.writeText(commit.sha);
    setCopiedSha(true);
    setTimeout(() => setCopiedSha(false), 2000);
  };

  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('repo', repoInfo.name);
    navigator.clipboard.writeText(url.toString());
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      
      {/* Upper Repository Title Grid */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {repoInfo.name}
          </h2>
          <p className="text-zinc-400 text-sm mt-1 max-w-2xl font-light">
            {repoInfo.description || 'No description provided.'}
          </p>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={handleShare}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 text-xs font-semibold text-white transition-all active:scale-95"
          >
            {copiedShare ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" />
                <span>Share Results</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Dashboard Panels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: The Genesis Commit Card (Span 2) */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between shadow-2xl">
          {/* Subtle glow circle inside card */}
          <div className="absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-brand-cyan/10 blur-3xl"></div>
          
          <div className="space-y-6">
            {/* Header info: Genesis label */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan px-2.5 py-1 rounded-full">
                Genesis Commit
              </span>
              <div className="flex items-center text-xs text-zinc-400 font-light">
                <Calendar className="h-3.5 w-3.5 mr-1.5 opacity-60" />
                {formatDate(commit.date)}
              </div>
            </div>

            {/* Commit message quote */}
            <div className="relative rounded-xl border border-white/[0.03] bg-white/[0.02] p-5">
              <Quote className="absolute -top-3 -left-1 h-8 w-8 text-white/5 -scale-x-100" />
              <p className="text-white text-lg font-medium leading-relaxed italic relative z-10 break-words">
                {commit.message}
              </p>
            </div>

            {/* Author Profile Information */}
            <div className="flex items-center space-x-4 border-t border-white/5 pt-5">
              <div className="relative shrink-0">
                {commit.author_avatar_url ? (
                  <img
                    src={commit.author_avatar_url}
                    alt={commit.author_name}
                    className="h-12 w-12 rounded-full border border-white/10 object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400">
                    <User className="h-6 w-6" />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-purple p-0.5">
                  <span className="text-[9px] font-bold text-white">#1</span>
                </div>
              </div>
              <div>
                <h4 className="text-white font-bold text-base leading-tight">
                  {commit.author_name}
                </h4>
                <p className="text-zinc-500 text-xs mt-0.5 font-light">
                  {commit.author_email}
                </p>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-white/5 mt-6 pt-5">
            {/* SHA code display */}
            <div className="flex items-center justify-between sm:justify-start space-x-2 bg-white/5 border border-white/5 px-3 py-1.5 rounded-xl">
              <span className="text-xs font-mono text-zinc-400">
                SHA: <span className="text-brand-cyan select-all">{commit.sha.substring(0, 8)}</span>
              </span>
              <button
                onClick={handleCopySha}
                className="text-zinc-500 hover:text-white p-1 rounded transition-colors"
                title="Copy SHA"
              >
                {copiedSha ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>

            {/* Launch Button */}
            <a
              href={commit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-sm font-bold text-background shadow-lg shadow-brand-cyan/20 hover:brightness-110 hover:shadow-brand-cyan/35 active:scale-95 transition-all text-center"
            >
              <span>Explore on GitHub</span>
              <ExternalLink className="h-4 w-4 shrink-0" />
            </a>
          </div>

        </div>

        {/* Right Side: Repository Metadata (Span 1) */}
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute bottom-0 left-0 -z-10 h-32 w-32 rounded-full bg-brand-purple/10 blur-3xl"></div>
          
          <div className="space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-purple bg-brand-purple/10 border border-brand-purple/20 px-2.5 py-1 rounded-full">
              Repository Stats
            </span>
            
            <div className="space-y-4 pt-2">
              {/* Star count */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="flex items-center text-xs font-medium text-zinc-400">
                  <Star className="h-4 w-4 text-amber-400 mr-2 shrink-0" />
                  Stargazers
                </span>
                <span className="text-white font-bold text-sm">
                  {repoInfo.stars.toLocaleString()}
                </span>
              </div>

              {/* Language */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="flex items-center text-xs font-medium text-zinc-400">
                  <Code className="h-4 w-4 text-brand-cyan mr-2 shrink-0" />
                  Primary Language
                </span>
                <span className="text-white font-bold text-sm bg-brand-cyan/10 px-2.5 py-0.5 rounded-md border border-brand-cyan/20">
                  {repoInfo.language || 'Unknown'}
                </span>
              </div>

              {/* Default branch */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="flex items-center text-xs font-medium text-zinc-400">
                  <GitFork className="h-4 w-4 text-brand-purple mr-2 shrink-0" />
                  Default Branch
                </span>
                <span className="text-white font-mono text-xs bg-brand-purple/10 px-2 py-0.5 rounded-md border border-brand-purple/20">
                  {repoInfo.default_branch}
                </span>
              </div>

              {/* Repository Creation */}
              <div className="flex items-center justify-between pb-3">
                <span className="flex items-center text-xs font-medium text-zinc-400">
                  <FileCode2 className="h-4 w-4 text-emerald-400 mr-2 shrink-0" />
                  Project Birth
                </span>
                <span className="text-white font-bold text-sm">
                  {new Date(repoInfo.created_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Time Lapse Summary Card */}
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.03] p-4 mt-6">
            <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block">
              Repository Age
            </span>
            <span className="text-white font-extrabold text-xl tracking-tight block mt-1">
              {formatTimeAgo(repoInfo.created_at)}
            </span>
            <span className="text-xs text-zinc-400 font-light mt-0.5 block">
              Elapsed time since the genesis commit.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
