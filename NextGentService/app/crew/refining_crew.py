from crewai import Crew, Task
from app.agents.refining import refining_agent
from app.schemas.refined_problem import RefinedProblem

def run_refining_crew(raw_problem_chat):
    task = Task(
        description=f"""
Refine the following stakeholder conversation into a structured problem definition.

Conversation:
{raw_problem_chat}

Rules:
- Do NOT invent requirements
- Do NOT suggest solutions
- Focus only on clarification and refinement
""",
        expected_output="A structured refined problem definition",
        agent=refining_agent,
        output_json=RefinedProblem  # 🔥 THIS IS THE FIX
    )

    crew = Crew(
        agents=[refining_agent],
        tasks=[task],
        verbose=False
    )

    return crew.kickoff()
