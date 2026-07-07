import React, { useState } from 'react';
import { Search, Loader2, Sparkles, History, Trash2 } from 'lucide-react';
import { validateRepositoryInput } from '../../lib/validators';

interface RepoSearchFormProps {
  onSearch: (repo: string) => void;
  isLoading: boolean;
  history: string[];
  onClearHistory: () => void;
}

export const RepoSearchForm: React.FC<RepoSearchFormProps> = ({
  onSearch,
  isLoading,
  history,
  onClearHistory
}) => {
  const [input, setInput] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const validation = validateRepositoryInput(input);
    if (!validation.isValid) {
      setValidationError(validation.error || 'Invalid format.');
      return;
    }

    onSearch(input);
  };

  const handleSuggestionClick = (repo: string) => {
    setInput(repo);
    setValidationError(null);
    onSearch(repo);
  };

  const popularSuggestions = [
    'facebook/react',
    'fastapi/fastapi',
    'tailwindlabs/tailwindcss',
    'vercel/next.js'
  ];

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center rounded-2xl p-[1px] transition-all bg-white/10 hover:bg-white/15 focus-within:bg-gradient-to-r focus-within:from-brand-cyan focus-within:to-brand-purple focus-within:shadow-[0_0_30px_rgba(0,242,254,0.15)]">
          <div className="flex w-full items-center bg-background rounded-[15px] px-4 py-3">
            <Search className="h-5 w-5 text-zinc-500 mr-3 shrink-0" />
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="Enter GitHub URL or owner/repo..."
              className="w-full bg-transparent text-white placeholder-zinc-500 focus:outline-none text-base sm:text-lg"
              disabled={isLoading}
            />
            {isLoading ? (
              <Loader2 className="h-5 w-5 text-brand-cyan animate-spin shrink-0 ml-2" />
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-purple text-xs font-semibold text-background hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 disabled:hover:brightness-100"
              >
                <span>Find</span>
              </button>
            )}
          </div>
        </div>

        {/* Input Validation Error */}
        {validationError && (
          <p className="absolute -bottom-6 left-2 text-xs font-medium text-rose-400">
            {validationError}
          </p>
        )}
      </form>

      {/* Suggested & History Area */}
      <div className="flex flex-col space-y-4 pt-2">
        {/* Popular Tags */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center text-xs font-semibold uppercase tracking-wider text-zinc-500 mr-1">
            <Sparkles className="h-3 w-3 mr-1 text-brand-cyan" />
            Explore:
          </span>
          {popularSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              disabled={isLoading}
              className="text-xs bg-white/5 border border-white/5 hover:border-brand-cyan/20 hover:bg-white/10 text-zinc-300 hover:text-white px-2.5 py-1 rounded-lg transition-all"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Recent Search History */}
        {history.length > 0 && (
          <div className="flex flex-col space-y-2 rounded-xl border border-white/5 bg-white/[0.02] p-3">
            <div className="flex items-center justify-between text-xs text-zinc-500 font-semibold uppercase tracking-wider">
              <span className="flex items-center">
                <History className="h-3 w-3 mr-1" />
                Recent Queries
              </span>
              <button
                onClick={onClearHistory}
                className="flex items-center text-zinc-500 hover:text-rose-400 transition-colors"
                title="Clear History"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {history.map((repo) => (
                <button
                  key={repo}
                  onClick={() => handleSuggestionClick(repo)}
                  disabled={isLoading}
                  className="text-xs bg-brand-purple/10 border border-brand-purple/20 hover:bg-brand-purple/20 text-brand-cyan px-2.5 py-1 rounded-lg transition-all"
                >
                  {repo}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
