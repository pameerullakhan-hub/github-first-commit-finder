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
  Quote,
  Clock
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
    <div className="mx-auto w-full max-w-5xl space-y-8">
      
      {/* Upper Repository Title Grid */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            {repoInfo.name}
          </h2>
          <p className="text-zinc-400 text-base md:text-lg mt-2 max-w-3xl font-normal leading-relaxed">
            {repoInfo.description || 'No description provided.'}
          </p>
        </div>
        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-brand-cyan/40 hover:bg-white/10 text-sm font-bold text-white transition-all active:scale-95 shadow-md"
          >
            {copiedShare ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4" />
                <span>Share Results</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Dashboard Panels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: The Genesis Commit Card (Span 2) */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between shadow-2xl border border-white/10">
          {/* Subtle glow circle inside card */}
          <div className="absolute top-0 right-0 -z-10 h-48 w-48 rounded-full bg-brand-cyan/10 blur-3xl"></div>
          
          <div className="space-y-8">
            {/* Header info: Genesis label and Large Date block */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
              <span className="self-start text-xs font-black uppercase tracking-widest bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan px-3.5 py-1.5 rounded-full">
                Genesis Commit
              </span>
              <div className="flex items-center text-sm sm:text-base text-zinc-300 font-semibold bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                <Calendar className="h-4 w-4 mr-2 text-brand-cyan shrink-0" />
                {formatDate(commit.date)}
              </div>
            </div>

            {/* LARGE Commit message quote */}
            <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 sm:p-8">
              <Quote className="absolute -top-4 -left-2 h-12 w-12 text-white/5 -scale-x-100" />
              <p className="text-white text-xl sm:text-2xl font-bold leading-relaxed italic relative z-10 break-words tracking-tight">
                "{commit.message}"
              </p>
            </div>

            {/* LARGE Author Profile Information */}
            <div className="flex items-center space-x-5 border-t border-white/5 pt-6">
              <div className="relative shrink-0">
                {commit.author_avatar_url ? (
                  <img
                    src={commit.author_avatar_url}
                    alt={commit.author_name}
                    className="h-16 w-16 rounded-full border-2 border-brand-cyan object-cover shadow-lg"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-cyan bg-white/5 text-zinc-400">
                    <User className="h-8 w-8" />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-purple border-2 border-background p-0.5">
                  <span className="text-[10px] font-black text-white">#1</span>
                </div>
              </div>
              <div>
                <h4 className="text-white font-extrabold text-lg sm:text-xl leading-tight">
                  {commit.author_name}
                </h4>
                <p className="text-zinc-400 text-sm sm:text-base mt-1 font-normal">
                  {commit.author_email}
                </p>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-white/5 mt-8 pt-6">
            {/* SHA code display (larger) */}
            <div className="flex items-center justify-between sm:justify-start space-x-3 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl">
              <span className="text-sm font-mono text-zinc-300 font-medium">
                SHA: <span className="text-brand-cyan select-all font-bold tracking-wider">{commit.sha.substring(0, 10)}</span>
              </span>
              <button
                onClick={handleCopySha}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
                title="Copy SHA"
              >
                {copiedSha ? (
                  <Check className="h-4.5 w-4.5 text-emerald-400" />
                ) : (
                  <Copy className="h-4.5 w-4.5" />
                )}
              </button>
            </div>

            {/* Launch Button */}
            <a
              href={commit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-base font-black text-background shadow-lg shadow-brand-cyan/20 hover:brightness-110 hover:shadow-brand-cyan/35 active:scale-95 transition-all text-center"
            >
              <span>Explore Commit on GitHub</span>
              <ExternalLink className="h-5 w-5 shrink-0" />
            </a>
          </div>

        </div>

        {/* Right Side: Repository Metadata (Span 1) */}
        <div className="glass-card rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden border border-white/10">
          <div className="absolute bottom-0 left-0 -z-10 h-48 w-48 rounded-full bg-brand-purple/10 blur-3xl"></div>
          
          <div className="space-y-8">
            <span className="text-xs font-black uppercase tracking-widest text-brand-purple bg-brand-purple/10 border border-brand-purple/30 px-3.5 py-1.5 rounded-full">
              Repository Stats
            </span>
            
            <div className="space-y-6 pt-2">
              {/* Star count */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="flex items-center text-sm font-semibold text-zinc-300">
                  <Star className="h-5 w-5 text-amber-400 mr-2 shrink-0 animate-pulse-slow" />
                  Stargazers
                </span>
                <span className="text-white font-black text-lg sm:text-xl">
                  {repoInfo.stars.toLocaleString()}
                </span>
              </div>

              {/* Language */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="flex items-center text-sm font-semibold text-zinc-300">
                  <Code className="h-5 w-5 text-brand-cyan mr-2 shrink-0" />
                  Primary Language
                </span>
                <span className="text-white font-black text-sm sm:text-base bg-brand-cyan/10 px-3 py-1 rounded-xl border border-brand-cyan/20">
                  {repoInfo.language || 'Unknown'}
                </span>
              </div>

              {/* Default branch */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="flex items-center text-sm font-semibold text-zinc-300">
                  <GitFork className="h-5 w-5 text-brand-purple mr-2 shrink-0" />
                  Default Branch
                </span>
                <span className="text-white font-mono text-sm bg-brand-purple/10 px-3 py-1 rounded-xl border border-brand-purple/20 font-bold">
                  {repoInfo.default_branch}
                </span>
              </div>

              {/* Repository Creation */}
              <div className="flex items-center justify-between pb-2">
                <span className="flex items-center text-sm font-semibold text-zinc-300">
                  <FileCode2 className="h-5 w-5 text-emerald-400 mr-2 shrink-0" />
                  Project Birth
                </span>
                <span className="text-white font-black text-base sm:text-lg">
                  {new Date(repoInfo.created_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Time Lapse Summary Card */}
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5 mt-8">
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider flex items-center">
              <Clock className="h-4 w-4 mr-1.5 text-brand-purple" />
              Repository Age
            </span>
            <span className="text-gradient font-black text-3xl sm:text-4xl tracking-tight block mt-2 text-glow-cyan">
              {formatTimeAgo(repoInfo.created_at)}
            </span>
            <span className="text-xs sm:text-sm text-zinc-400 font-normal mt-1 block leading-relaxed">
              Elapsed time since the genesis commit.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
