from app.models.dashboard import DashboardSummaryModel, RankingItemModel, SummaryCountsModel


class SummaryMapper:
    def build_summary(self, mode: str, estates: list):
        red = [e for e in estates if e.status == "red"]
        orange = [e for e in estates if e.status == "orange"]
        green = [e for e in estates if e.status == "green"]

        top_loss = sorted(
            [
                RankingItemModel(key=e.key, name=e.name, value=e.profit_actual, status=e.status)
                for e in estates
            ],
            key=lambda item: item.value,
        )[:10]

        below_budget = [
            RankingItemModel(key=e.key, name=e.name, value=e.crop_variance, status=e.status)
            for e in estates
            if e.crop_variance < 0
        ][:10]

        return DashboardSummaryModel(
            mode=mode,
            counts=SummaryCountsModel(
                total=len(estates),
                red=len(red),
                orange=len(orange),
                green=len(green),
            ),
            estates=estates,
            top_loss=top_loss,
            below_budget=below_budget,
        )