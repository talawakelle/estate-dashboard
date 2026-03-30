from dataclasses import dataclass, field
from typing import List, Optional


@dataclass
class KpiModel:
    key: str
    label: str
    budget: float
    actual: float
    achieved: Optional[float] = None
    gsa: Optional[float] = None
    rank: Optional[int] = None


@dataclass
class CropSectionModel:
    crop_name: str
    kpis: List[KpiModel] = field(default_factory=list)


@dataclass
class EstateModel:
    id: str
    key: str
    name: str
    order: int
    row_type: str
    status: str
    crop_variance: float
    profit_actual: float

    crop_budget: float = 0.0
    crop_actual: float = 0.0

    nsa_budget: float = 0.0
    nsa_actual: float = 0.0

    cop_budget: float = 0.0
    cop_actual: float = 0.0

    profit_budget: float = 0.0

    kpis: List[KpiModel] = field(default_factory=list)
    crops: List[CropSectionModel] = field(default_factory=list)