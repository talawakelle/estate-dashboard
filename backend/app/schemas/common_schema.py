from pydantic import BaseModel


class KpiSchema(BaseModel):
    key: str
    label: str
    budget: float
    actual: float
    achieved: float | None = None
    previous_year_budget: float | None = None
    previous_year_actual: float | None = None
    gsa: float | None = None
    rank: int | None = None


class CropSectionSchema(BaseModel):
    crop_name: str
    kpis: list[KpiSchema]
    