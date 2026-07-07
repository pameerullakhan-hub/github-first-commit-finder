from datetime import datetime

def parse_iso_datetime(iso_str: str) -> datetime:
    """
    Parses ISO 8601 datetime strings (e.g. 2013-05-24T16:15:54Z)
    """
    # Replace 'Z' with '+00:00' to support older python version isoformat parsers
    if iso_str.endswith('Z'):
        iso_str = iso_str[:-1] + '+00:00'
    return datetime.fromisoformat(iso_str)
