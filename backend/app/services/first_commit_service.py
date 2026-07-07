from typing import Tuple
from app.clients.github_client import GitHubClient
from app.utils.repo_parser import parse_repository_input
from app.schemas.first_commit import FirstCommitResponse, CommitDetail, RepositoryInfo
from app.core.errors import GitHubAPIError

async def find_first_commit(repo_input: str) -> FirstCommitResponse:
    """
    Business logic to parse repo input, call GitHub, paginated jump to the
    last page of commits, and return structured first commit details.
    """
    # 1. Normalize repository input
    owner, repo = parse_repository_input(repo_input)
    
    client = GitHubClient()
    try:
        # 2. Fetch repository metadata to verify and get default branch
        repo_data = await client.get_repository(owner, repo)
        default_branch = repo_data.get("default_branch") or "main"
        
        # 3. Request page 1 of commits to discover pagination
        commits, link_header = await client.get_commits_page(
            owner, repo, default_branch, page=1, per_page=100
        )
        
        if not commits:
            raise GitHubAPIError(400, f"Repository '{owner}/{repo}' has no commits on branch '{default_branch}'.")
            
        first_commit_data = None
        
        # 4. Check if there are multiple pages of commits
        last_page = client.parse_last_page_from_link_header(link_header)
        
        if last_page and last_page > 1:
            # Fetch the very last page of commits
            last_page_commits, _ = await client.get_commits_page(
                owner, repo, default_branch, page=last_page, per_page=100
            )
            if last_page_commits:
                # The last item on the last page is the first commit
                first_commit_data = last_page_commits[-1]
                
        # Fallback if no last page or last page was empty
        if not first_commit_data:
            first_commit_data = commits[-1]
            
        # 5. Extract commit details safely
        sha = first_commit_data.get("sha", "")
        commit_obj = first_commit_data.get("commit", {})
        author_obj = commit_obj.get("author", {})
        
        # Extract author user details (if linked to a GitHub profile)
        github_user_obj = first_commit_data.get("author") or {}
        avatar_url = github_user_obj.get("avatar_url")
        
        commit_detail = CommitDetail(
            sha=sha,
            message=commit_obj.get("message", "No commit message"),
            author_name=author_obj.get("name", "Unknown Author"),
            author_email=author_obj.get("email", "unknown@example.com"),
            date=author_obj.get("date", ""),
            url=first_commit_data.get("html_url", f"https://github.com/{owner}/{repo}/commit/{sha}"),
            author_avatar_url=avatar_url
        )
        
        # 6. Extract repository metadata
        repo_info = RepositoryInfo(
            name=repo_data.get("full_name", f"{owner}/{repo}"),
            description=repo_data.get("description"),
            stars=repo_data.get("stargazers_count", 0),
            language=repo_data.get("language"),
            default_branch=default_branch,
            created_at=repo_data.get("created_at", "")
        )
        
        return FirstCommitResponse(
            repository=f"{owner}/{repo}",
            first_commit=commit_detail,
            repository_info=repo_info
        )
        
    finally:
        await client.close()
