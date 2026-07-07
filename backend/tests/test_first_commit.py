import pytest
from unittest.mock import AsyncMock, MagicMock, patch
from app.services.first_commit_service import find_first_commit
from app.core.errors import RepositoryNotFoundError, GitHubRateLimitError

@pytest.mark.asyncio
@patch("app.services.first_commit_service.GitHubClient")
async def test_find_first_commit_single_page(mock_client_class):
    # Set up mocks for GitHubClient instance
    mock_client = AsyncMock()
    mock_client_class.return_value = mock_client
    mock_client.parse_last_page_from_link_header = MagicMock(return_value=None)
    
    # Mock get_repository
    mock_client.get_repository.return_value = {
        "full_name": "owner/repo",
        "description": "A test repo",
        "stargazers_count": 100,
        "language": "Python",
        "default_branch": "main",
        "created_at": "2020-01-01T00:00:00Z"
    }
    
    # Mock get_commits_page (single page: no Link header)
    mock_client.get_commits_page.return_value = (
        [
            {"sha": "newest_sha", "commit": {"message": "Newer commit", "author": {"name": "User", "email": "user@mail.com", "date": "2020-01-02T00:00:00Z"}}},
            {"sha": "oldest_sha", "commit": {"message": "Initial commit", "author": {"name": "Creator", "email": "creator@mail.com", "date": "2020-01-01T00:00:00Z"}}}
        ],
        None # No link header
    )
    

    
    response = await find_first_commit("owner/repo")
    
    assert response.repository == "owner/repo"
    assert response.first_commit.sha == "oldest_sha"
    assert response.first_commit.message == "Initial commit"
    assert response.first_commit.author_name == "Creator"
    assert response.repository_info.stars == 100
    assert response.repository_info.language == "Python"
    
    # Verify calls
    mock_client.get_repository.assert_called_once_with("owner", "repo")
    mock_client.get_commits_page.assert_called_once_with("owner", "repo", "main", page=1, per_page=100)


@pytest.mark.asyncio
@patch("app.services.first_commit_service.GitHubClient")
async def test_find_first_commit_multi_page(mock_client_class):
    mock_client = AsyncMock()
    mock_client_class.return_value = mock_client
    mock_client.parse_last_page_from_link_header = MagicMock(return_value=5)
    
    mock_client.get_repository.return_value = {
        "full_name": "owner/multi-page",
        "description": "Multi page repo",
        "stargazers_count": 500,
        "language": "TypeScript",
        "default_branch": "develop",
        "created_at": "2015-05-01T00:00:00Z"
    }
    
    # Page 1 mock response with Link header for 5 pages
    mock_client.get_commits_page.side_effect = [
        # Call 1: Page 1
        (
            [{"sha": "newest_sha", "commit": {"message": "Latest", "author": {"name": "User", "email": "u@mail.com", "date": "2022-01-01T00:00:00Z"}}}],
            '<https://api.github.com/...page=2>; rel="next", <https://api.github.com/...page=5>; rel="last"'
        ),
        # Call 2: Page 5
        (
            [
                {"sha": "page5_mid_sha", "commit": {"message": "Middle", "author": {"name": "User", "email": "u@mail.com", "date": "2015-05-02T00:00:00Z"}}},
                {"sha": "first_sha", "commit": {"message": "Genesis", "author": {"name": "Founder", "email": "f@mail.com", "date": "2015-05-01T00:00:00Z"}}}
            ],
            None
        )
    ]
    

    
    response = await find_first_commit("owner/multi-page")
    
    assert response.first_commit.sha == "first_sha"
    assert response.first_commit.message == "Genesis"
    assert response.first_commit.author_name == "Founder"
    assert response.repository_info.default_branch == "develop"
    
    assert mock_client.get_commits_page.call_count == 2
