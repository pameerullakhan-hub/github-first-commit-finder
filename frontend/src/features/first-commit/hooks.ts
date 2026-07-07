import { useState, useEffect, useCallback } from 'react';
import { fetchFirstCommit } from './api';
import { FirstCommitResponse, FirstCommitError } from './types';
import { APIError } from '../../lib/http';

const HISTORY_KEY = 'git_first_commit_search_history';

export function useFirstCommit() {
  const [data, setData] = useState<FirstCommitResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirstCommitError | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch {
      // Ignore reading issues
    }
  }, []);

  const addToHistory = useCallback((repo: string) => {
    setHistory((prev) => {
      const normalized = repo.toLowerCase().trim();
      const filtered = prev.filter((item) => item.toLowerCase() !== normalized);
      const nextHistory = [repo, ...filtered].slice(0, 5); // limit to 5
      localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
      return nextHistory;
    });
  }, []);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(HISTORY_KEY);
    setHistory([]);
  }, []);

  const clearSearch = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  const search = useCallback(async (repo: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFirstCommit(repo);
      setData(result);
      addToHistory(result.repository);
    } catch (err: unknown) {
      setData(null);
      if (err instanceof APIError) {
        setError({
          message: err.message,
          type: err.errorType,
          status: err.status,
        });
      } else {
        setError({
          message: 'Failed to connect to the backend server. Please make sure the FastAPI server is running.',
          type: 'NetworkError',
        });
      }
    } finally {
      setLoading(false);
    }
  }, [addToHistory]);

  return {
    data,
    loading,
    error,
    history,
    search,
    clearHistory,
    clearSearch,
  };
}
