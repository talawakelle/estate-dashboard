from pydantic import BaseModel


class UploadResponseSchema(BaseModel):
    filename: str
    message: str
    month_records: int
    todate_records: int