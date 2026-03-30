class ChartMapper:
    def to_budget_actual_series(self, kpis):
        return [
            {
                "key": kpi.key,
                "label": kpi.label,
                "budget": kpi.budget,
                "actual": kpi.actual,
            }
            for kpi in kpis
        ]