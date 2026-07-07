import re
import httpx
from typing import Optional, List, Dict, Any, Tuple
from app.core.config import settings
from app.core.errors import GitHubAPIError, RepositoryNotFoundError, GitHubRateLimitError

class GitHubClient:
    def __init__(self, token: Optional[str] = None):
        self.token = token or settings.GITHUB_TOKEN
        self.base_url = "https://api.github.com"
        
        headers = {
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "GitHub-First-Commit-Finder"
        }
        if self.token:
            headers["Authorization"] = f"Bearer {self.token}"
            
        self.client = httpx.AsyncClient(headers=headers, timeout=15.0)

    async def close(self):
        await self.client.aclose()

    async def _handle_response_errors(self, response: httpx.Response, owner: str, repo: str):
        if response.status_code == 403:
            # Check if rate limit
            rate_limit_remaining = response.headers.get("x-ratelimit-remaining")
            reset_time = response.headers.get("x-ratelimit-reset")
            if rate_limit_remaining == "0":
                # Convert epoch reset time if possible
                import datetime
                reset_date_str = None
                if reset_time:
                    try:
                        reset_date_str = datetime.datetime.fromtimestamp(
                            int(reset_time), tz=datetime.timezone.utc
                        ).strftime("%Y-%m-%d %H:%M:%S UTC")
                    except ValueError:
                        pass
                raise GitHubRateLimitError(reset_time=reset_date_str)
                
        if response.status_code == 404:
            raise RepositoryNotFoundError(owner, repo)
            
        if response.status_code >= 400:
            detail = "GitHub API returned an error."
            try:
                data = response.json()
                detail = data.get("message", detail)
            except Exception:
                pass
            raise GitHubAPIError(response.status_code, detail)

    async def get_repository(self, owner: str, repo: str) -> Dict[str, Any]:
        """
        Fetches repository metadata from GitHub.
        """
        url = f"{self.base_url}/repos/{owner}/{repo}"
        response = await self.client.get(url)
        if response.status_code != 200:
            await self._handle_response_errors(response, owner, repo)
        return response.json()

    async def get_commits_page(
        self, owner: str, repo: str, branch: str, page: int, per_page: int = 100
    ) -> Tuple[List[Dict[str, Any]], Optional[str]]:
        """
        Fetches a specific page of commits for a repository on a given branch.
        Returns a tuple of (commit_list, link_header_value).
        """
        url = f"{self.base_url}/repos/{owner}/{repo}/commits"
        params = {
            "sha": branch,
            "page": page,
            "per_page": per_page
        }
        response = await self.client.get(url, params=params)
        if response.status_code != 200:
            await self._handle_response_errors(response, owner, repo)
            
        link_header = response.headers.get("Link")
        return response.json(), link_header

    @staticmethod
    def parse_last_page_from_link_header(link_header: Optional[str]) -> Optional[int]:
        """
        Parses the last page number from the Link header.
        Example Link header:
        <https://api.github.com/...page=2>; rel="next", <https://api.github.com/...page=145>; rel="last"
        """
        if not link_header:
            return None
            
        links = link_header.split(',')
        for link in links:
            if 'rel="last"' in link:
                match = re.search(r'[?&]page=(\d+)', link)
                if match:
                    return int(match.group(1))
        return None
