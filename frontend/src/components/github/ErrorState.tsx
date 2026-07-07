import React from 'react';
import { AlertCircle, Lock, ShieldAlert, WifiOff, CornerDownRight } from 'lucide-react';
import { FirstCommitError } from '../../features/first-commit/types';

interface ErrorStateProps {
  error: FirstCommitError;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  const isRateLimit = error.type === 'GitHubRateLimitError' || error.status === 403;
  const isNotFound = error.type === 'RepositoryNotFoundError' || error.status === 404;
  const isNetwork = error.type === 'NetworkError';

  return (
    <div className="mx-auto w-full max-w-2xl rounded-2xl glass-card p-6 border-rose-500/20 shadow-2xl relative overflow-hidden">
      
      {/* Red ambient decorative glow */}
      <div className="absolute top-0 right-0 -z-10 h-24 w-24 rounded-full bg-rose-500/10 blur-2xl"></div>

      <div className="flex items-start space-x-4">
        
        {/* Error Category Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border bg-rose-500/10 border-rose-500/20 text-rose-400 shrink-0">
          {isRateLimit ? (
            <Lock className="h-6 w-6" />
          ) : isNotFound ? (
            <ShieldAlert className="h-6 w-6" />
          ) : isNetwork ? (
            <WifiOff className="h-6 w-6" />
          ) : (
            <AlertCircle className="h-6 w-6" />
          )}
        </div>

        {/* Error details */}
        <div className="space-y-2">
          <h3 className="text-white font-extrabold text-lg tracking-tight">
            {isRateLimit
              ? 'GitHub Rate Limit Exceeded'
              : isNotFound
              ? 'Repository Not Found'
              : isNetwork
              ? 'Server Connection Failure'
              : 'Error Executing Query'}
          </h3>
          <p className="text-zinc-300 text-sm leading-relaxed font-light">
            {error.message}
          </p>

          {/* Useful Solution Tips */}
          <div className="pt-3 space-y-1.5 border-t border-white/5 mt-3">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
              Suggested Solutions:
            </span>
            <ul className="space-y-1">
              {isRateLimit && (
                <>
                  <li className="flex items-center text-xs text-zinc-400">
                    <CornerDownRight className="h-3 w-3 mr-1.5 text-brand-cyan shrink-0" />
                    <span>Create a <code>.env</code> file in the <code>backend/</code> folder.</span>
                  </li>
                  <li className="flex items-center text-xs text-zinc-400">
                    <CornerDownRight className="h-3 w-3 mr-1.5 text-brand-cyan shrink-0" />
                    <span>Provide a <code>GITHUB_TOKEN</code> inside it for higher limits (5000/hr).</span>
                  </li>
                </>
              )}
              {isNotFound && (
                <>
                  <li className="flex items-center text-xs text-zinc-400">
                    <CornerDownRight className="h-3 w-3 mr-1.5 text-brand-cyan shrink-0" />
                    <span>Verify that the spelling of the owner and repo name is correct.</span>
                  </li>
                  <li className="flex items-center text-xs text-zinc-400">
                    <CornerDownRight className="h-3 w-3 mr-1.5 text-brand-cyan shrink-0" />
                    <span>Ensure the repository is public (private repos require a GITHUB_TOKEN).</span>
                  </li>
                </>
              )}
              {isNetwork && (
                <>
                  <li className="flex items-center text-xs text-zinc-400">
                    <CornerDownRight className="h-3 w-3 mr-1.5 text-brand-cyan shrink-0" />
                    <span>Make sure the backend FastAPI application is running (port 8000).</span>
                  </li>
                  <li className="flex items-center text-xs text-zinc-400">
                    <CornerDownRight className="h-3 w-3 mr-1.5 text-brand-cyan shrink-0" />
                    <span>Check your internet connection and retry the query.</span>
                  </li>
                </>
              )}
              {!isRateLimit && !isNotFound && !isNetwork && (
                <li className="flex items-center text-xs text-zinc-400">
                  <CornerDownRight className="h-3 w-3 mr-1.5 text-brand-cyan shrink-0" />
                  <span>Double-check your input URL format and submit again.</span>
                </li>
              )}
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
};
