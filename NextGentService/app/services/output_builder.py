def build_stakeholder_output(session: dict) -> dict:
    return {
        "problem_summary": session["refined_problem"].get("problem_summary"),
        "constraints": session["primary_constraints"],  # 🔥 SOURCE OF TRUTH
        "validation": session["validated_problem"],
    }


def build_developer_output(session: dict) -> dict:
    return {
        "final_problem_definition": session["refined_problem"],
        "constraints": session["primary_constraints"],  # 🔥 SOURCE OF TRUTH
        "assumptions": session["refined_problem"].get("assumptions", []),
        "risks": session["validated_problem"].get("key_risks", []),
    }
