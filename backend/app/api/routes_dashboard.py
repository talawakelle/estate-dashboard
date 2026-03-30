from fastapi import APIRouter, HTTPException, Query

from app.dependencies import estate_service, summary_service
from app.schemas.dashboard_schema import DashboardSummarySchema
from app.schemas.estate_schema import EstateDetailSchema
from app.schemas.estate_schema import EstateListItemSchema

router = APIRouter(tags=["dashboard"])


@router.get("/dashboard/summary", response_model=DashboardSummarySchema)
def get_dashboard_summary(mode: str = Query(..., pattern="^(month|todate)$")):
    data = summary_service.get_summary(mode)
    if data is None:
        raise HTTPException(status_code=404, detail="No uploaded workbook data found.")
    return data


@router.get("/dashboard/estates", response_model=list[EstateListItemSchema])
def get_estates(mode: str = Query(..., pattern="^(month|todate)$")):
    data = estate_service.get_estates(mode)
    if data is None:
        raise HTTPException(status_code=404, detail="No uploaded workbook data found.")
    return data


@router.get("/dashboard/estate/{estate_key}", response_model=EstateDetailSchema)
def get_estate_detail(estate_key: str, mode: str = Query(..., pattern="^(month|todate)$")):
    data = estate_service.get_estate_detail(mode=mode, estate_key=estate_key)
    if data is None:
        raise HTTPException(status_code=404, detail="Estate not found.")
    return data