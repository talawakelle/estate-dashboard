from app.core.constants import ROW_TYPE_GROUP, ROW_TYPE_OPERATIONAL, ROW_TYPE_TOTAL


class EstateGroupProcessor:
    def detect_row_type(self, name: str) -> str:
        upper = name.upper()
        if "TOTAL" in upper:
            return ROW_TYPE_TOTAL
        if any(token in upper for token in ["GROWN", "COM.", "E/L", "B/L"]):
            return ROW_TYPE_GROUP
        return ROW_TYPE_OPERATIONAL