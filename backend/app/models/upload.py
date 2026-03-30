from dataclasses import dataclass


@dataclass
class UploadResultModel:
    filename: str
    message: str
    month_records: int
    todate_records: int