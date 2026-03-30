from fastapi import APIRouter, File, HTTPException, UploadFile

from app.dependencies import upload_service
from app.schemas.upload_schema import UploadResponseSchema

router = APIRouter(tags=["upload"])


@router.post("/upload", response_model=UploadResponseSchema)
async def upload_workbook(
    current_month_file: UploadFile = File(...),
    current_year_file: UploadFile | None = File(None),
    previous_month_file: UploadFile | None = File(None),
    gsa_current_file: UploadFile | None = File(None),
    gsa_previous_file: UploadFile | None = File(None),
):
    for upload in [current_month_file, current_year_file, previous_month_file, gsa_current_file, gsa_previous_file]:
        if upload is None:
            continue
        if not upload.filename.lower().endswith((".xlsx", ".xlsm", ".xls")):
            raise HTTPException(status_code=400, detail="Only Excel files are allowed.")

    try:
        result = await upload_service.process_upload(
            monthly_file=current_month_file,
            history_file=current_year_file,
            previous_year_file=previous_month_file,
            gsa_current_file=gsa_current_file,
            gsa_previous_file=gsa_previous_file,
        )
        return result
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc