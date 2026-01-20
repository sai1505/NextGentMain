from app.config.llm import llm

CLARITY_MIN_ANSWERS = 3  # heuristic, improve later


def generate_next_question(stakeholder_chat: list[str]) -> str:
    """
    Ask ONE focused question to clarify the software idea.
    """

    prompt = f"""
You are a senior Business Analyst.

Your job:
- Ask ONLY ONE question at a time
- Ask the MOST important missing question
- Be concise
- Do NOT explain anything
- Do NOT summarize
- Do NOT ask multiple questions

Conversation so far:
{stakeholder_chat}

Return ONLY the next question.
"""

    response = llm.call(messages=[{"role": "user", "content": prompt}])

    return response.strip()


def clarity_reached(stakeholder_chat: list[str]) -> bool:
    """
    Temporary heuristic.
    Later replaced with semantic clarity detection.
    """
    return len(stakeholder_chat) >= CLARITY_MIN_ANSWERS * 2
