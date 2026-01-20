import json
from app.config.llm import llm
from app.utils.json_safe import extract_json


def detect_required_changes(
    refined_problem: dict,
    validator_chat: list[dict],
    primary_constraints: dict,
) -> dict:
    prompt = f"""
You are a senior system reviewer responsible for logical correctness.

You MUST follow these rules:
- Primary constraints are NON-NEGOTIABLE
- If any proposal contradicts them, feasibility MUST be false
- Do NOT invent scope reductions
- Do NOT assume unrealistic cost adjustments

Primary Constraints (IMMUTABLE):
{primary_constraints}

Current Refined Problem:
{refined_problem}

Validator Conversation:
{validator_chat}

Your tasks:
1. Detect if validator feedback introduces REQUIRED changes
2. Detect if any HARD CONSTRAINT VIOLATION exists
3. If a violation exists, mark feasibility as impossible
4. Only suggest corrections if they are logically valid

Respond STRICTLY in JSON:

{{
  "changes_required": true | false,
  "constraint_violation": true | false,
  "violation_reason": "..." | null,
  "corrections": [
    {{
      "field": "assumptions | constraints | scope | budget | risks",
      "action": "add | modify | remove",
      "details": "..."
    }}
  ]
}}
"""

    response_text = llm.call(messages=[{"role": "user", "content": prompt}])

    return extract_json(response_text)
