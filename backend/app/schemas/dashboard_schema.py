from pydantic import BaseModel

from app.schemas.estate_schema import EstateListItemSchema


class SummaryCountsSchema(BaseModel):
    total: int
    red: int
    orange: int
    green: int


class RankingItemSchema(BaseModel):
    key: str
    name: str
    value: float
    status: str


class DashboardSummarySchema(BaseModel):
    mode: str
    counts: SummaryCountsSchema
    estates: list[EstateListItemSchema]
    top_loss: list[RankingItemSchema]
    below_budget: list[RankingItemSchema]