from dataclasses import dataclass, field
from typing import List

from app.models.estate import EstateModel


@dataclass
class SummaryCountsModel:
    total: int
    red: int
    orange: int
    green: int


@dataclass
class RankingItemModel:
    key: str
    name: str
    value: float
    status: str


@dataclass
class DashboardSummaryModel:
    mode: str
    counts: SummaryCountsModel
    estates: List[EstateModel] = field(default_factory=list)
    top_loss: List[RankingItemModel] = field(default_factory=list)
    below_budget: List[RankingItemModel] = field(default_factory=list)