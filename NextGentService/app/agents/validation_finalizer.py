import json
from app.utils.json_safe import extract_json
from app.config.llm import llm


def finalize_validation(refined_problem: dict) -> dict:
    prompt = f"""
      You are a senior technical validator.

      Re-validate the following problem definition AFTER corrections.
      Confirm feasibility, risks, and readiness.

      Refined Problem:
      {json.dumps(refined_problem, indent=2)}

      Respond ONLY with valid JSON.
      No explanation.
      No markdown.

      {{
        "feasible": true,
        "key_risks": [],
        "final_notes": "..."
      }}
      """

    response_text = llm.call(messages=[{"role": "user", "content": prompt}])

    result = extract_json(response_text)

    if not isinstance(result, dict) or "feasible" not in result:
        raise ValueError("Invalid validation finalization output")

    return result
