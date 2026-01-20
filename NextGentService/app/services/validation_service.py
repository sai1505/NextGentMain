from app.agents.validation import detect_required_changes


def apply_validation_feedback(
    refined_problem: dict,
    validator_chat: list[dict],
    primary_constraints: dict,
) -> dict:
    analysis = detect_required_changes(
        refined_problem,
        validator_chat,
        primary_constraints,
    )

    if analysis.get("feasible") is False:
        refined_problem["feasible"] = False
        refined_problem["infeasibility_reason"] = analysis.get("reason")
        return refined_problem

    return refined_problem
