from crewai import Agent
from app.config.llm import llm

refining_agent = Agent(
    role="Problem Refinement Specialist",
    goal="Transform raw stakeholder inputs into a clean, precise, unambiguous problem statement.",
    backstory=(
        "You are a senior product analyst. "
        "You remove ambiguity, normalize terminology, "
        "identify implicit assumptions, and clarify scope."
    ),
    llm=llm,
    verbose=False,
)
