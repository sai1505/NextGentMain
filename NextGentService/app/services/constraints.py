from app.config.llm import llm
from app.utils.json_safe import extract_json


def extract_primary_constraints(stakeholder_chat: list[dict]) -> dict:
    prompt = f"""
You are extracting HARD, NON-NEGOTIABLE constraints.

From the stakeholder conversation, extract:
- budget (number, INR)
- location (city / region)
- business_type (short phrase)

Stakeholder Conversation:
{stakeholder_chat}

Respond ONLY in JSON:

{{
  "budget": 0,
  "location": "string",
  "business_type": "string"
}}
"""

    response = llm.call(messages=[{"role": "user", "content": prompt}])
    return extract_json(response)


def merge_primary_constraints(primary: dict, corrections: dict) -> dict:
    updated = primary.copy()

    for k, v in corrections.items():
        updated[k] = v  # ✅ ALWAYS overwrite

    return updated
