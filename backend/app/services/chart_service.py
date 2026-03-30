from app.mappers.chart_mapper import ChartMapper


class ChartService:
    def __init__(self):
        self.chart_mapper = ChartMapper()

    def get_chart_payload(self, estate):
        return self.chart_mapper.to_budget_actual_series(estate.kpis)