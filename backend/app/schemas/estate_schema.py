from pydantic import BaseModel

from app.schemas.common_schema import CropSectionSchema, KpiSchema


class EstateHistoryPointSchema(BaseModel):
    month: str
    crop_budget: float
    crop_actual: float
    nsa_budget: float
    nsa_actual: float
    cop_budget: float
    cop_actual: float
    profit_budget: float
    profit_actual: float


class PreviousYearPointSchema(BaseModel):
    key: str
    label: str
    current_actual: float
    previous_actual: float


class PeriodLabelsSchema(BaseModel):
    prev_budget: str
    prev_actual: str
    budget: str
    actual: str


class EstateListItemSchema(BaseModel):
    id: str
    key: str
    name: str
    order: int
    row_type: str
    status: str
    crop_variance: float
    profit_actual: float

    crop_budget: float | None = None
    crop_actual: float | None = None
    nsa_budget: float | None = None
    nsa_actual: float | None = None
    cop_budget: float | None = None
    cop_actual: float | None = None
    profit_budget: float | None = None


class EstateDetailSchema(BaseModel):
    id: str
    key: str
    name: str
    order: int
    row_type: str
    status: str
    crop_variance: float
    profit_actual: float

    crop_budget: float | None = None
    crop_actual: float | None = None
    nsa_budget: float | None = None
    nsa_actual: float | None = None
    cop_budget: float | None = None
    cop_actual: float | None = None
    profit_budget: float | None = None

    kpis: list[KpiSchema]
    crops: list[CropSectionSchema]
    history: list[EstateHistoryPointSchema] = []
    previous_year: list[PreviousYearPointSchema] = []
    period_labels: PeriodLabelsSchema | None = None