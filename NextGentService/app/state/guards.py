def require_status(session, allowed):
    if isinstance(allowed, str):
        allowed = [allowed]

    if session["status"] not in allowed:
        raise ValueError(
            f"Invalid state. Expected {allowed}, got '{session['status']}'"
        )
