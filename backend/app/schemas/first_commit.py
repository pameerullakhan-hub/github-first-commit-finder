from pydantic import BaseModel, Field
from typing import Optional

class FirstCommitRequest(BaseModel):
    repository: str = Field(..., description="Repository URL or owner/repo format")

class CommitDetail(BaseModel):
    sha: str = Field(..., description="The full commit SHA")
    message: str = Field(..., description="Commit message")
    author_name: str = Field(..., description="Name of the commit author")
    author_email: str = Field(..., description="Email of the commit author")
    date: str = Field(..., description="Commit date in ISO 8601 format")
    url: str = Field(..., description="Link to the commit on GitHub")
    author_avatar_url: Optional[str] = Field(None, description="Avatar URL of the author")

class RepositoryInfo(BaseModel):
    name: str = Field(..., description="Full repository name (owner/repo)")
    description: Optional[str] = Field(None, description="Repository description")
    stars: int = Field(..., description="Number of stargazers")
    language: Optional[str] = Field(None, description="Primary programming language")
    default_branch: str = Field(..., description="The repository's default branch")
    created_at: str = Field(..., description="Repository creation date")

class FirstCommitResponse(BaseModel):
    repository: str = Field(..., description="Cleaned repository owner/name")
    first_commit: CommitDetail = Field(..., description="Earliest commit details")
    repository_info: RepositoryInfo = Field(..., description="Repository metadata")
