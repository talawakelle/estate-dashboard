class EstateService:
    def __init__(self, cache_repository):
        self.cache_repository = cache_repository

    def get_estates(self, mode: str):
        estates = self.cache_repository.get_mode_data(mode)
        if estates is None:
            return None

        ranked_estates = sorted(
            [e for e in estates if e.row_type == "operational"],
            key=lambda estate: estate.profit_actual,
            reverse=True,
        )
        rank_map = {estate.key: index + 1 for index, estate in enumerate(ranked_estates)}

        return [
            {
                "id": e.id,
                "key": e.key,
                "name": e.name,
                "order": e.order,
                "row_type": e.row_type,
                "status": e.status,
                "crop_variance": e.crop_variance,
                "profit_actual": e.profit_actual,
                "profit_budget": e.profit_budget,
                "crop_budget": e.crop_budget,
                "crop_actual": e.crop_actual,
                "nsa_budget": e.nsa_budget,
                "nsa_actual": e.nsa_actual,
                "cop_budget": e.cop_budget,
                "cop_actual": e.cop_actual,
                "rank": rank_map.get(e.key),
            }
            for e in estates
        ]

    def _build_period_labels(self):
        current_period = self.cache_repository.get_current_period_label()
        previous_period = self.cache_repository.get_previous_period_label()

        return {
            "prev_budget": f"{previous_period} Budget" if previous_period else "Prev Budget",
            "prev_actual": f"{previous_period} Actual" if previous_period else "Prev Actual",
            "budget": f"{current_period} Budget" if current_period else "Budget",
            "actual": f"{current_period} Actual" if current_period else "Actual",
        }

    def get_estate_detail(self, mode: str, estate_key: str):
        estates = self.cache_repository.get_mode_data(mode)
        if estates is None:
            return None

        estate = next((e for e in estates if e.key == estate_key), None)
        if estate is None:
            return None

        ranked_estates = sorted(
            [e for e in estates if e.row_type == "operational"],
            key=lambda item: item.profit_actual,
            reverse=True,
        )
        rank_map = {item.key: index + 1 for index, item in enumerate(ranked_estates)}

        history = []
        if mode == "todate":
            history = self.cache_repository.get_todate_history().get(estate_key, [])

        previous_estate = None
        if mode == "month":
            previous_year_estates = self.cache_repository.get_previous_year_month() or []
            previous_estate = next((e for e in previous_year_estates if e.key == estate_key), None)

        return {
            "id": estate.id,
            "key": estate.key,
            "name": estate.name,
            "order": estate.order,
            "row_type": estate.row_type,
            "status": estate.status,
            "crop_variance": estate.crop_variance,
            "profit_actual": estate.profit_actual,
            "crop_budget": estate.crop_budget,
            "crop_actual": estate.crop_actual,
            "nsa_budget": estate.nsa_budget,
            "nsa_actual": estate.nsa_actual,
            "cop_budget": estate.cop_budget,
            "cop_actual": estate.cop_actual,
            "profit_budget": estate.profit_budget,
            "kpis": [
                {
                    "key": k.key,
                    "label": k.label,
                    "budget": k.budget,
                    "actual": k.actual,
                    "achieved": k.achieved,
                    "gsa": (
                        estate.nsa_actual / estate.crop_actual
                        if k.key == "nsa" and estate.crop_actual not in (0, None)
                        else None
                    ),
                    "rank": rank_map.get(estate.key) if k.key == "nsa" else None,
                    "previous_year_budget": (
                        previous_estate.crop_budget
                        if previous_estate is not None and k.key == "crop"
                        else previous_estate.nsa_budget
                        if previous_estate is not None and k.key == "nsa"
                        else previous_estate.cop_budget
                        if previous_estate is not None and k.key == "cop"
                        else previous_estate.profit_budget
                        if previous_estate is not None and k.key == "profit_after_sundry_income"
                        else None
                    ),
                    "previous_year_actual": (
                        previous_estate.crop_actual
                        if previous_estate is not None and k.key == "crop"
                        else previous_estate.nsa_actual
                        if previous_estate is not None and k.key == "nsa"
                        else previous_estate.cop_actual
                        if previous_estate is not None and k.key == "cop"
                        else previous_estate.profit_actual
                        if previous_estate is not None and k.key == "profit_after_sundry_income"
                        else None
                    ),
                }
                for k in estate.kpis
            ],
            "crops": [
                {
                    "crop_name": c.crop_name,
                    "kpis": [
                        {
                            "key": k.key,
                            "label": k.label,
                            "budget": k.budget,
                            "actual": k.actual,
                        }
                        for k in c.kpis
                    ],
                }
                for c in estate.crops
            ],
            "history": history,
            "period_labels": self._build_period_labels(),
        }