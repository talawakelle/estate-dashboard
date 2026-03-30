import re

from app.models.upload import UploadResultModel
from app.processors.month_processor import MonthProcessor


class UploadService:
    def __init__(
        self,
        workbook_repository,
        cache_repository,
        excel_reader_service,
        parser_service,
    ):
        self.workbook_repository = workbook_repository
        self.cache_repository = cache_repository
        self.excel_reader_service = excel_reader_service
        self.parser_service = parser_service
        self.month_processor = MonthProcessor()

    def _build_history(self, workbook_history: dict):
        history = {}

        for month_name, dataframe in workbook_history.items():
            estates = self.parser_service.parse_dataframe(dataframe)

            for estate in estates:
                history.setdefault(estate.key, []).append(
                    {
                        "month": month_name,
                        "crop_budget": estate.crop_budget,
                        "crop_actual": estate.crop_actual,
                        "nsa_budget": estate.nsa_budget,
                        "nsa_actual": estate.nsa_actual,
                        "cop_budget": estate.cop_budget,
                        "cop_actual": estate.cop_actual,
                        "profit_budget": estate.profit_budget,
                        "profit_actual": estate.profit_actual,
                    }
                )

        return history

    def _extract_period_label(self, filename: str | None) -> str | None:
        if not filename:
            return None

        cleaned = filename.rsplit(".", 1)[0].replace("_", " ").strip()

        # 1) Best case: explicit range already exists
        range_match = re.search(r"(20\d{2})\s*[-/]\s*(20\d{2})", cleaned)
        if range_match:
            return f"{range_match.group(1)}-{range_match.group(2)}"

        # 2) Try to detect month + year and convert to fiscal year (Apr-Mar)
        month_map = {
            "jan": 1, "january": 1,
            "feb": 2, "february": 2,
            "mar": 3, "march": 3,
            "apr": 4, "april": 4,
            "may": 5,
            "jun": 6, "june": 6,
            "jul": 7, "july": 7,
            "aug": 8, "august": 8,
            "sep": 9, "sept": 9, "september": 9,
            "oct": 10, "october": 10,
            "nov": 11, "november": 11,
            "dec": 12, "december": 12,
        }

        month_year_match = re.search(
            r"\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t|tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\b.*?\b(20\d{2})\b",
            cleaned,
            flags=re.IGNORECASE,
        )

        if month_year_match:
            month_text = month_year_match.group(1).lower()
            year = int(month_year_match.group(2))
            month_num = month_map[month_text]

            # Fiscal year = Apr to Mar
            if month_num >= 4:
                start_year = year
                end_year = year + 1
            else:
                start_year = year - 1
                end_year = year

            return f"{start_year}-{end_year}"

        # 3) If only a single year exists, do NOT blindly invent the wrong period
        #    Returning None is safer than lying.
        return None

    async def process_upload(
        self,
        monthly_file,
        history_file=None,
        previous_year_file=None,
        gsa_current_file=None,
        gsa_previous_file=None,
    ):
        monthly_content = await monthly_file.read()
        self.workbook_repository.save(monthly_file.filename, monthly_content)

        monthly_workbook = self.excel_reader_service.read_workbook(monthly_content)
        month_estates = self.month_processor.process(
            self.parser_service,
            monthly_workbook["month"],
        )

        todate_estates = []
        todate_history = {}
        previous_year_month = []

        if history_file is not None:
            history_content = await history_file.read()
            workbook_history = self.excel_reader_service.read_history_workbook(history_content)

            if "January" in workbook_history:
                todate_estates = self.parser_service.parse_dataframe(workbook_history["January"])
            else:
                latest_month = list(workbook_history.keys())[-1]
                todate_estates = self.parser_service.parse_dataframe(workbook_history[latest_month])

            todate_history = self._build_history(workbook_history)
        else:
            todate_estates = list(month_estates)

        if previous_year_file is not None:
            previous_year_content = await previous_year_file.read()
            previous_year_workbook = self.excel_reader_service.read_workbook(previous_year_content)
            previous_year_month = self.month_processor.process(
                self.parser_service,
                previous_year_workbook["month"],
            )

        current_period_label = self._extract_period_label(monthly_file.filename)
        previous_period_label = self._extract_period_label(
            previous_year_file.filename if previous_year_file is not None else None
        )

        self.cache_repository.set_mode_data("month", month_estates)
        self.cache_repository.set_mode_data("todate", todate_estates)
        self.cache_repository.set_summary("month", None)
        self.cache_repository.set_summary("todate", None)
        self.cache_repository.set_todate_history(todate_history)
        self.cache_repository.set_previous_year_month(previous_year_month)
        self.cache_repository.set_period_labels(
            current_period_label=current_period_label,
            previous_period_label=previous_period_label,
        )

        names = [monthly_file.filename]
        if history_file is not None:
            names.append(history_file.filename)
        if previous_year_file is not None:
            names.append(previous_year_file.filename)
        if gsa_current_file is not None:
            names.append(gsa_current_file.filename)
        if gsa_previous_file is not None:
            names.append(gsa_previous_file.filename)

        combined_name = " + ".join(names)
        self.cache_repository.set_filename(combined_name)

        return UploadResultModel(
            filename=combined_name,
            message="Workbook(s) processed successfully.",
            month_records=len(month_estates),
            todate_records=len(todate_estates),
        )