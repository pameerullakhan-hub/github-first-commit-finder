from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

class GitHubUser(BaseModel):
    login: str
    id: int
    avatar_url: str
    url: str

class GitHubRepoResponse(BaseModel):
    name: str
    full_name: str
    private: bool
    owner: GitHubUser
    description: Optional[str] = None
    created_at: str
    updated_at: str
    pushed_at: str
    stargazers_count: int
    watchers_count: int
    language: Optional[str] = None
    default_branch: str

class GitHubCommitAuthor(BaseModel):
    name: str
    email: str
    date: str

class GitHubCommitDetail(BaseModel):
    author: GitHubCommitAuthor
    committer: GitHubCommitAuthor
    message: str
    url: str
    comment_count: int

class GitHubCommitResponse(BaseModel):
    sha: str
    commit: GitHubCommitDetail
    html_url: str
    author: Optional[GitHubUser] = None
    parents: List[Dict[str, Any]]
