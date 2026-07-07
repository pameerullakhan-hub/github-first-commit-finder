export interface CommitDetail {
  sha: string;
  message: string;
  author_name: string;
  author_email: string;
  date: string;
  url: string;
  author_avatar_url?: string;
}

export interface RepositoryInfo {
  name: string;
  description?: string;
  stars: number;
  language?: string;
  default_branch: string;
  created_at: string;
}

export interface FirstCommitResponse {
  repository: string;
  first_commit: CommitDetail;
  repository_info: RepositoryInfo;
}

export interface FirstCommitError {
  message: string;
  type: string;
  status?: number;
}
