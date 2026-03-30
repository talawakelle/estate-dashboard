from app.core.utils import safe_str
from app.mappers.column_mapper import ColumnMapper
from app.mappers.estate_mapper import EstateMapper
from app.processors.estate_group_processor import EstateGroupProcessor
from app.processors.kpi_processor import KpiProcessor


class ParserService:
    def __init__(self, status_service):
        self.status_service = status_service
        self.column_mapper = ColumnMapper()
        self.estate_mapper = EstateMapper()
        self.kpi_processor = KpiProcessor()
        self.group_processor = EstateGroupProcessor()

    def _extract_raw_name(self, row, mapping) -> str:
        primary_name = safe_str(row.iloc[mapping.name])

        if primary_name:
            return primary_name

        fallback_name = safe_str(row.iloc[mapping.serial])
        return fallback_name

    def _normalize(self, value: str) -> str:
        return value.strip().lower()

    def _normalize_key(self, value: str) -> str:
        return (
            value.strip()
            .lower()
            .replace(".", "")
            .replace(" ", "_")
        )

    def _resolve_combined_name(self, raw_name: str, last_low_grown_family: str | None) -> str:
        key = self._normalize_key(raw_name)

        alias_map = {
            "moragalla_com": "Moragalla_Combined",
            "moragalla_combined": "Moragalla_Combined",
            "deniyaya_com": "Deniyaya_Combined",
            "deniyaya_combined": "Deniyaya_Combined",
            "kganga_com": "Kganga_Combined",
            "kganga_combined": "Kganga_Combined",
            "indola_com": "Indola_Combined",
            "indola_combined": "Indola_Combined",
        }

        if key in alias_map:
            return alias_map[key]

        if key != "combined":
            return raw_name

        if last_low_grown_family == "moragalla":
            return "Moragalla_Combined"
        if last_low_grown_family == "deniyaya":
            return "Deniyaya_Combined"
        if last_low_grown_family == "kganga":
            return "Kganga_Combined"
        if last_low_grown_family == "indola":
            return "Indola_Combined"
        if last_low_grown_family == "handford":
            return "SKIP_HANDFORD_COMBINED"

        return raw_name

    def _should_skip_row(self, row_index: int, name: str, total_rows: int) -> bool:
        if total_rows > 3 and row_index < 3:
            return True

        if not name:
            return True

        normalized = name.strip().lower()

        if normalized in {"estate", "month:", "skip_handford_combined"}:
            return True

        if normalized.startswith("january"):
            return True
        if normalized.startswith("february"):
            return True
        if normalized.startswith("march"):
            return True
        if normalized.startswith("april"):
            return True
        if normalized.startswith("may"):
            return True
        if normalized.startswith("june"):
            return True
        if normalized.startswith("july"):
            return True
        if normalized.startswith("august"):
            return True
        if normalized.startswith("september"):
            return True
        if normalized.startswith("october"):
            return True
        if normalized.startswith("november"):
            return True
        if normalized.startswith("december"):
            return True

        return False

    def parse_dataframe(self, dataframe):
        mapping = self.column_mapper.get_map(dataframe)
        estates = []
        order = 1
        last_low_grown_family = None

        for row_index, row in dataframe.iterrows():
            raw_name = self._extract_raw_name(row, mapping)
            normalized_raw = self._normalize(raw_name)

            if normalized_raw.startswith("moragalla"):
                last_low_grown_family = "moragalla"
            elif normalized_raw.startswith("deniyaya"):
                last_low_grown_family = "deniyaya"
            elif normalized_raw.startswith("handford"):
                last_low_grown_family = "handford"
            elif normalized_raw.startswith("indola"):
                last_low_grown_family = "indola"
            elif normalized_raw.startswith("kganga"):
                last_low_grown_family = "kganga"

            name = self._resolve_combined_name(raw_name, last_low_grown_family)

            if self._should_skip_row(row_index, name, len(dataframe)):
                continue

            kpis = self.kpi_processor.extract(row, mapping)

            row_type = self.group_processor.detect_row_type(name)
            status = self.status_service.get_status(
                profit_actual=kpis["profit_actual"],
                crop_variance=kpis["crop_variance"],
                profit_budget=kpis["profit_budget"],
            )

            estate = self.estate_mapper.build_estate(
                name=name,
                order=order,
                row_type=row_type,
                status=status,
                crop_variance=kpis["crop_variance"],
                crop_budget=kpis["crop_budget"],
                crop_actual=kpis["crop_actual"],
                crop_achieved=kpis["crop_achieved"],
                nsa_budget=kpis["nsa_budget"],
                nsa_actual=kpis["nsa_actual"],
                cop_budget=kpis["cop_budget"],
                cop_actual=kpis["cop_actual"],
                profit_budget=kpis["profit_budget"],
                profit_actual=kpis["profit_actual"],
            )

            estates.append(estate)
            order += 1

        return estates