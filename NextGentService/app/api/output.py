from fastapi import APIRouter, HTTPException
from app.state.session_store import get_session
from app.services.output_builder import (
    build_stakeholder_output,
    build_developer_output,
)

router = APIRouter(prefix="/output", tags=["Output"])


@router.get("/stakeholder/{session_id}")
def stakeholder_output(session_id: str):
    session = get_session(session_id)
    if not session:
        raise HTTPException(404, "Invalid session")

    if not session.get("validated_problem"):
        raise HTTPException(400, "No validated output available")

    return build_stakeholder_output(session)


@router.get("/developer/{session_id}")
def developer_output(session_id: str):
    session = get_session(session_id)
    if not session:
        raise HTTPException(404, "Invalid session")

    if not session.get("validated_problem"):
        raise HTTPException(400, "No validated output available")

    return build_developer_output(session)
