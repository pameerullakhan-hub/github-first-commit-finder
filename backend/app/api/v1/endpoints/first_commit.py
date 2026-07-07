from fastapi import APIRouter, HTTPException
from app.schemas.first_commit import FirstCommitRequest, FirstCommitResponse
from app.services.first_commit_service import find_first_commit

router = APIRouter()

@router.post("/first-commit", response_model=FirstCommitResponse)
async def get_first_commit(payload: FirstCommitRequest):
    """
    Finds the first commit of a given GitHub repository.
    """
    try:
        response = await find_first_commit(payload.repository)
        return response
    except Exception as e:
        # Most exceptions will be handled by our custom exception handlers in main.py,
        # but in case of unhandled errors, raise a standard HTTPException.
        if hasattr(e, "status_code"):
            raise e
        raise HTTPException(status_code=500, detail=str(e))
