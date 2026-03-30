from app.core.constants import KPI_COP, KPI_CROP, KPI_LABELS, KPI_NSA, KPI_PROFIT
from app.core.utils import slugify
from app.models.estate import CropSectionModel, EstateModel, KpiModel


class EstateMapper:
    def build_estate(
        self,
        name: str,
        order: int,
        row_type: str,
        status: str,
        crop_variance: float,
        crop_budget: float,
        crop_actual: float,
        crop_achieved: float,
        nsa_budget: float,
        nsa_actual: float,
        cop_budget: float,
        cop_actual: float,
        profit_budget: float,
        profit_actual: float,
    ) -> EstateModel:
        kpis = [
            KpiModel(KPI_CROP, KPI_LABELS[KPI_CROP], crop_budget, crop_actual, crop_achieved),
            KpiModel(KPI_NSA, KPI_LABELS[KPI_NSA], nsa_budget, nsa_actual, None),
            KpiModel(KPI_COP, KPI_LABELS[KPI_COP], cop_budget, cop_actual, None),
            KpiModel(KPI_PROFIT, KPI_LABELS[KPI_PROFIT], profit_budget, profit_actual, None),
        ]

        key = slugify(name)

        return EstateModel(
            id=key,
            key=key,
            name=name,
            order=order,
            row_type=row_type,
            status=status,
            crop_variance=crop_variance,
            profit_actual=profit_actual,
            crop_budget=crop_budget,
            crop_actual=crop_actual,
            nsa_budget=nsa_budget,
            nsa_actual=nsa_actual,
            cop_budget=cop_budget,
            cop_actual=cop_actual,
            profit_budget=profit_budget,
            kpis=kpis,
            crops=[CropSectionModel(crop_name="Combined", kpis=kpis)],
        )