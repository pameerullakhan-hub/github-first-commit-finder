from fastapi import Request, FastAPI
from fastapi.responses import JSONResponse

class GitHubAPIError(Exception):
    def __init__(self, status_code: int, message: str):
        self.status_code = status_code
        self.message = message
        super().__init__(message)

class RepositoryNotFoundError(GitHubAPIError):
    def __init__(self, owner: str, repo: str):
        super().__init__(404, f"Repository '{owner}/{repo}' not found or is private.")

class GitHubRateLimitError(GitHubAPIError):
    def __init__(self, reset_time: str = None):
        msg = "GitHub API rate limit exceeded. Please provide a GITHUB_TOKEN or try again later."
        if reset_time:
            msg += f" Rate limit resets at {reset_time}."
        super().__init__(403, msg)

class InvalidRepositoryURLError(Exception):
    def __init__(self, message: str):
        self.message = message
        super().__init__(message)

def setup_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(GitHubAPIError)
    async def github_api_error_handler(request: Request, exc: GitHubAPIError):
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.message, "error_type": exc.__class__.__name__}
        )

    @app.exception_handler(InvalidRepositoryURLError)
    async def invalid_repo_url_handler(request: Request, exc: InvalidRepositoryURLError):
        return JSONResponse(
            status_code=400,
            content={"detail": exc.message, "error_type": "InvalidRepositoryURLError"}
        )
