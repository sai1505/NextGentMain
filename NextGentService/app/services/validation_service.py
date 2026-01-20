from app.agents.validation_change_detector import detect_required_changes


def apply_validation_feedback(
    refined_problem: dict,
    validator_chat: list[dict],
    primary_constraints: dict,
) -> dict:
    analysis = detect_required_changes(
        refined_problem=refined_problem,
        validator_chat=validator_chat,
        primary_constraints=primary_constraints,
    )

    # 🔥 HARD STOP — constraint violation
    if analysis.get("constraint_violation"):
        refined_problem["feasible"] = False
        refined_problem["infeasibility_reason"] = analysis.get("violation_reason")
        return refined_problem

    # No changes required
    if not analysis.get("changes_required"):
        return refined_problem

    updated = refined_problem.copy()

    for correction in analysis.get("corrections", []):
        field = correction.get("field")
        action = correction.get("action")
        details = correction.get("details")

        if field not in updated:
            continue

        if action == "add" and isinstance(updated[field], list):
            updated[field].append(details)

        elif action == "modify":
            updated[field] = details

        elif action == "remove" and isinstance(updated[field], list):
            updated[field] = [x for x in updated[field] if details not in x]

    return updated
