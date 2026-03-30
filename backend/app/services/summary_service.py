from app.mappers.summary_mapper import SummaryMapper


class SummaryService:
    def __init__(self, cache_repository):
        self.cache_repository = cache_repository
        self.summary_mapper = SummaryMapper()

    def get_summary(self, mode: str):
        summary = self.cache_repository.get_summary(mode)
        if summary is not None:
            return summary

        estates = self.cache_repository.get_mode_data(mode)
        if estates is None:
            return None

        summary = self.summary_mapper.build_summary(mode=mode, estates=estates)
        self.cache_repository.set_summary(mode, summary)
        return summary