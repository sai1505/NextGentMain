def build_stakeholder_output(session: dict) -> dict:
    return {
        "problem_summary": session["refined_problem"],
        "validation": session["validated_problem"],
    }


def build_developer_output(session: dict) -> dict:
    return {
        "final_problem_definition": session["refined_problem"],
        "validation_notes": session["validated_problem"],
        "assumptions": session["refined_problem"].get("assumptions", []),
        "constraints": session["refined_problem"].get("constraints", []),
        "risks": session["validated_problem"].get("key_risks", []),
    }
