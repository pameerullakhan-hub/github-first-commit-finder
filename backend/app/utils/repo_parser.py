import re
from typing import Tuple
from app.core.errors import InvalidRepositoryURLError

# Owner validation: alphanumeric and hyphens (no consecutive hyphens, not start/end with hyphen)
# GitHub rules: "Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen"
OWNER_PATTERN = re.compile(r'^[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$')

# Repo validation: alphanumeric, hyphens, underscores, dots
REPO_PATTERN = re.compile(r'^[a-zA-Z0-9\-._]+$')

def parse_repository_input(repo_input: str) -> Tuple[str, str]:
    """
    Parses repository input which can be in forms:
      - facebook/react
      - https://github.com/facebook/react
      - git@github.com:facebook/react.git
      
    Returns (owner, repo) tuple.
    Raises InvalidRepositoryURLError if format is invalid.
    """
    if not repo_input:
        raise InvalidRepositoryURLError("Repository input cannot be empty.")
        
    cleaned = repo_input.strip()
    
    # Remove protocol prefix
    if cleaned.startswith("https://"):
        cleaned = cleaned[8:]
    elif cleaned.startswith("http://"):
        cleaned = cleaned[7:]
        
    # Remove www.
    if cleaned.startswith("www."):
        cleaned = cleaned[4:]
        
    # Handle git@github.com: prefix
    if cleaned.startswith("git@github.com:"):
        cleaned = cleaned[15:]
    # Handle github.com/ prefix
    elif cleaned.startswith("github.com/"):
        cleaned = cleaned[11:]
        
    # Remove trailing .git
    if cleaned.endswith(".git"):
        cleaned = cleaned[:-4]
        
    # Remove leading/trailing slashes
    cleaned = cleaned.strip("/")
    
    parts = cleaned.split("/")
    
    if len(parts) != 2:
        raise InvalidRepositoryURLError(
            f"Invalid repository format: '{repo_input}'. "
            "Please provide a format like 'owner/repo' or 'https://github.com/owner/repo'"
        )
        
    owner, repo = parts[0], parts[1]
    
    # Validate owner & repo names against character rules
    if not OWNER_PATTERN.match(owner):
        raise InvalidRepositoryURLError(
            f"Invalid repository owner: '{owner}'. "
            "GitHub owner names must contain only alphanumeric characters and single hyphens."
        )
        
    if not REPO_PATTERN.match(repo):
        raise InvalidRepositoryURLError(
            f"Invalid repository name: '{repo}'. "
            "GitHub repository names must contain only alphanumeric characters, hyphens, dots, and underscores."
        )
        
    return owner, repo
