from app.config.llm import llm
from app.utils.json_safe import extract_json


def validation_agent_reply(refined_problem: dict, validator_chat: list[dict]) -> str:
    """
    AI validation response based on refined problem + validator interaction.
    """

    prompt = f"""
You are a Senior Technical Validator.

Your task:
- Validate feasibility and practicality
- Identify risks and limitations
- Suggest improvements
- Be precise and technical
- Do NOT finalize anything

Refined Problem:
{refined_problem}

Validator Conversation So Far:
{validator_chat}

Respond to the validator's latest input.
"""

    response = llm.call(messages=[{"role": "user", "content": prompt}])

    return response.strip()


def finalize_validation(refined_problem: dict) -> dict:
    if refined_problem.get("feasible") is False:
        return {
            "feasible": False,
            "key_risks": [],
            "final_notes": refined_problem.get("infeasibility_reason"),
        }

    prompt = f"""
        Revalidate feasibility STRICTLY.

        Refined Problem:
        {refined_problem}

        Respond ONLY JSON:
        {{ "feasible": true, "key_risks": [], "final_notes": "Approved" }}
        """
    response = llm.call(messages=[{"role": "user", "content": prompt}])
    return extract_json(response)


def detect_required_changes(
    refined_problem: dict,
    validator_chat: list[dict],
    primary_constraints: dict,
) -> dict:
    prompt = f"""
        You are a senior system reviewer.

        PRIMARY CONSTRAINTS (IMMUTABLE):
        {primary_constraints}

        RULES:
        - Primary constraints act as a schema, not frozen values
        - Only fill missing or null fields
        - NEVER overwrite existing non-null values
        - NEVER delete existing fields
        - If validator feedback contradicts an existing filled value → mark infeasible
        - If new info fills missing data → update constraints
        - No silent overwrites


        Refined Problem:
        {refined_problem}

        Validator Conversation:
        {validator_chat}

        Respond ONLY in JSON:

        {{
          "changes_required": true,
          "feasible": true | false,
          "reason": "...",
          "corrections": []
        }}
        """

    response_text = llm.call(messages=[{"role": "user", "content": prompt}])

    return extract_json(response_text)
