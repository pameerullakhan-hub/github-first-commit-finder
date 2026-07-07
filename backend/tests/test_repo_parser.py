import pytest
from app.utils.repo_parser import parse_repository_input
from app.core.errors import InvalidRepositoryURLError

def test_parse_valid_formats():
    assert parse_repository_input("facebook/react") == ("facebook", "react")
    assert parse_repository_input("https://github.com/facebook/react") == ("facebook", "react")
    assert parse_repository_input("http://github.com/facebook/react") == ("facebook", "react")
    assert parse_repository_input("github.com/facebook/react") == ("facebook", "react")
    assert parse_repository_input("https://github.com/facebook/react.git") == ("facebook", "react")
    assert parse_repository_input("git@github.com:facebook/react.git") == ("facebook", "react")
    assert parse_repository_input(" facebook/react ") == ("facebook", "react")
    assert parse_repository_input("facebook/react/") == ("facebook", "react")

def test_parse_invalid_formats():
    invalid_inputs = [
        "",
        "   ",
        "facebook",
        "https://github.com/facebook",
        "https://github.com/facebook/react/issues",
        "http://google.com/facebook/react",
        "facebook/react/extra/parts"
    ]
    for inp in invalid_inputs:
        with pytest.raises(InvalidRepositoryURLError):
            parse_repository_input(inp)
