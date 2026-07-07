import React, { useEffect } from 'react';
import { useFirstCommit } from '../features/first-commit/hooks';
import { RepoSearchForm } from '../components/github/RepoSearchForm';
import { CommitResultCard } from '../components/github/CommitResultCard';
import { CommitTimeline } from '../components/github/CommitTimeline';
import { ErrorState } from '../components/github/ErrorState';
import { Sparkles, GitBranch, Github, Loader2 } from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    data,
    loading,
    error,
    history,
    search,
    clearHistory,
    clearSearch
  } = useFirstCommit();

  // Read URL search parameter '?repo=owner/name' on mount for direct sharing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const repoParam = params.get('repo');
    if (repoParam) {
      search(repoParam);
    }
  }, [search]);

  return (
    <div className="space-y-12 py-4">
      
      {/* Hero Title Intro Header */}
      {!data && !loading && (
        <div className="text-center space-y-4 max-w-2xl mx-auto pt-10 md:pt-16">
          <div className="inline-flex items-center space-x-2 rounded-full border border-brand-purple/20 bg-brand-purple/10 px-3 py-1 text-xs text-brand-cyan">
            <Sparkles className="h-3.5 w-3.5 animate-pulse-slow" />
            <span className="font-semibold tracking-wide uppercase">Genesis Commit Engine</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Discover the <span className="text-gradient">First Commit</span> of Any Project
          </h1>
          
          <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
            Locate the exact moment a codebase came to life. We smartly page through GitHub history to instantly retrieve repository origin metadata.
          </p>
        </div>
      )}

      {/* Main Search Panel */}
      <div className={`${data ? 'pt-2' : 'pt-6'}`}>
        <RepoSearchForm
          onSearch={search}
          isLoading={loading}
          history={history}
          onClearHistory={clearHistory}
        />
      </div>

      {/* Loading state spinner */}
      {loading && (
        <div className="flex flex-col items-center justify-center space-y-4 py-20">
          <div className="relative flex h-16 w-16 items-center justify-center">
            <Loader2 className="h-10 w-10 text-brand-cyan animate-spin" />
            <div className="absolute inset-0 rounded-full border border-brand-cyan/20 blur-md animate-pulse"></div>
          </div>
          <p className="text-zinc-400 text-sm font-light tracking-wide animate-pulse">
            Connecting to GitHub nodes, jumping to final commit page...
          </p>
        </div>
      )}

      {/* Error state presentation */}
      {!loading && error && (
        <div className="animate-fade-in pt-4">
          <ErrorState error={error} />
        </div>
      )}

      {/* Success state results and timeline dashboard */}
      {!loading && data && (
        <div className="space-y-12 animate-fade-in pt-4">
          {/* Main commit showcase card */}
          <CommitResultCard
            commit={data.first_commit}
            repoInfo={data.repository_info}
          />
          
          {/* Timeline visualization */}
          <CommitTimeline
            commit={data.first_commit}
            repoInfo={data.repository_info}
          />

          {/* Reset Action */}
          <div className="flex justify-center pt-4">
            <button
              onClick={() => {
                // Clear URL parameters
                const url = new URL(window.location.href);
                url.searchParams.delete('repo');
                window.history.pushState({}, '', url.toString());
                clearSearch();
              }}
              className="text-xs text-zinc-500 hover:text-zinc-300 font-semibold uppercase tracking-wider flex items-center transition-colors"
            >
              <GitBranch className="h-3.5 w-3.5 mr-1" />
              Reset Search
            </button>
          </div>
        </div>
      )}

      {/* Bottom Footer Area */}
      {!loading && !data && (
        <footer className="text-center pt-16 pb-6 border-t border-white/5 max-w-xl mx-auto flex items-center justify-center space-x-2 text-xs text-zinc-600">
          <Github className="h-4 w-4" />
          <span>Made for GitHub explorers</span>
        </footer>
      )}

    </div>
  );
};
