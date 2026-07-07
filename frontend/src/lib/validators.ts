// Matches valid formats: owner/repo, github.com/owner/repo, http(s)://github.com/owner/repo
const REPO_REGEX = /^(?:https?:\/\/(?:www\.)?github\.com\/|git@github\.com:)?([a-zA-Z0-9\-._]+)\/([a-zA-Z0-9\-._]+?)(?:\.git|\/)?$/;

export interface ValidationResult {
  isValid: boolean;
  owner?: string;
  repo?: string;
  error?: string;
}

export function validateRepositoryInput(input: string): ValidationResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Repository name cannot be empty.' };
  }

  const match = REPO_REGEX.exec(trimmed);
  if (!match) {
    return {
      isValid: false,
      error: 'Please enter a valid format: "owner/repo" or "github.com/owner/repo".'
    };
  }

  const [, owner, repo] = match;
  if (!owner || !repo) {
    return {
      isValid: false,
      error: 'Could not extract owner and repository names.'
    };
  }

  return {
    isValid: true,
    owner,
    repo
  };
}
