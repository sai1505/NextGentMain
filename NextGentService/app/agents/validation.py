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
        You are a Senior System Architect.

        Evaluate feasibility logically based on:
        - budget realism
        - technical complexity
        - location constraints
        - scope vs budget
        - regulatory feasibility

        Refined Problem:
        {refined_problem}

        RULES
        - Do NOT modify constraints.
        - Do NOT suggest updates.
        - Only judge feasibility.

        Respond ONLY JSON:
        {{
        "feasible": true | false,
        "key_risks": [],
        "final_notes": "..."
        }}
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

        TASK:
        - Read the validator conversation
        - Extract ONLY concrete constraint updates explicitly stated by the user
        - Ignore suggestions, questions, or hypotheticals
        - If the user says "budget is 20L", extract budget=20L
        - If no concrete updates are present, return empty corrections

        RULES:
        - ALWAYS overwrite constraints if user explicitly updates them
        - User validation overrides previous constraints
        - If user input contradicts existing constraints, treat the new value as an UPDATE
        - Do NOT mark feasible=false for constraint updates

        Refined Problem:
        {refined_problem}

        Validator Conversation:
        {validator_chat}

        Respond ONLY in JSON:

        {{
        "changes_required": true | false,
        "feasible": true | false,
        "reason": "...",
        "corrections": {{
            "<constraint_name>": "<new_value>"
        }}
        }}
        """

    response_text = llm.call(messages=[{"role": "user", "content": prompt}])

    return extract_json(response_text)
