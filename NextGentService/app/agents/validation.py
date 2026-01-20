from app.config.llm import llm


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
