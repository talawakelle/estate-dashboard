from app.core.constants import STATUS_GREEN, STATUS_ORANGE, STATUS_RED


class StatusService:
    def get_status(
        self,
        profit_actual: float,
        crop_variance: float,
        profit_budget: float | None = None,
    ) -> str:
        if profit_actual < 0:
            return STATUS_RED

        if crop_variance < 0:
            return STATUS_ORANGE

        if profit_budget is not None and profit_actual < profit_budget:
            return STATUS_ORANGE

        return STATUS_GREEN
