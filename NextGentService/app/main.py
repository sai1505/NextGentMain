from fastapi import FastAPI
from app.api.stakeholder import router as stakeholder_router
from app.api.validator import router as validator_router
from app.api.output import router as output_router

app = FastAPI(title="Virtual SDLC Engine")

app.include_router(stakeholder_router)
app.include_router(validator_router)
app.include_router(output_router)
