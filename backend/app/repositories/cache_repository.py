class CacheRepository:
    def __init__(self):
        self._store = {
            "month": [],
            "todate": [],
            "summary_month": None,
            "summary_todate": None,
            "filename": None,
            "todate_history": {},
            "previous_year_month": [],
            "current_period_label": None,
            "previous_period_label": None,
        }

    def set_mode_data(self, mode: str, data):
        self._store[mode] = data

    def get_mode_data(self, mode: str):
        return self._store.get(mode)

    def set_summary(self, mode: str, data):
        self._store[f"summary_{mode}"] = data

    def get_summary(self, mode: str):
        return self._store.get(f"summary_{mode}")

    def set_filename(self, filename: str):
        self._store["filename"] = filename

    def get_filename(self):
        return self._store.get("filename")

    def set_todate_history(self, history: dict):
        self._store["todate_history"] = history

    def get_todate_history(self):
        return self._store.get("todate_history", {})

    def set_previous_year_month(self, estates):
        self._store["previous_year_month"] = estates

    def get_previous_year_month(self):
        return self._store.get("previous_year_month", [])

    def set_period_labels(
        self,
        current_period_label: str | None,
        previous_period_label: str | None,
    ):
        self._store["current_period_label"] = current_period_label
        self._store["previous_period_label"] = previous_period_label

    def get_current_period_label(self):
        return self._store.get("current_period_label")

    def get_previous_period_label(self):
        return self._store.get("previous_period_label")