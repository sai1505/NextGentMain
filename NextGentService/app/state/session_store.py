import uuid
from datetime import datetime

# In-memory store (session_id -> session)
_SESSIONS = {}


def create_session():
    session_id = str(uuid.uuid4())

    _SESSIONS[session_id] = {
        "session_id": session_id,
        "status": "questioning",
        "stakeholder_chat": [],
        "raw_problem": [],
        "primary_constraints": {},  # ✅ ADD
        "refined_problem": None,
        "validator_chat": [],
        "final_output": None,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }

    return session_id


def get_session(session_id: str):
    return _SESSIONS.get(session_id)


def update_session(session_id: str, **kwargs):
    session = _SESSIONS.get(session_id)
    if not session:
        return None

    for key, value in kwargs.items():
        session[key] = value

    session["updated_at"] = datetime.utcnow()
    return session


def append_stakeholder_message(session_id: str, role: str, content: str):
    session = _SESSIONS.get(session_id)
    if not session:
        return None

    session["stakeholder_chat"].append({"role": role, "content": content})
    session["updated_at"] = datetime.utcnow()
    return session


def append_validator_message(session_id: str, role: str, content: str):
    session = _SESSIONS.get(session_id)
    if not session:
        return None

    session["validator_chat"].append({"role": role, "content": content})
    session["updated_at"] = datetime.utcnow()
    return session
