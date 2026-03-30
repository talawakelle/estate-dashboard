from io import BytesIO
import pandas as pd

from app.core.exceptions import WorksheetMissingError


class ExcelReaderService:
    REQUIRED_SHEETS = ("Month", "Todate")
    MONTH_SHEETS = (
        "April", "May", "June", "July", "August", "September",
        "October", "November", "December", "January", "February", "March",
    )

    def read_workbook(self, content: bytes) -> dict[str, pd.DataFrame]:
        workbook = pd.ExcelFile(BytesIO(content))

        for sheet in self.REQUIRED_SHEETS:
            if sheet not in workbook.sheet_names:
                raise WorksheetMissingError(f"Required sheet '{sheet}' not found.")

        return {
            "month": pd.read_excel(BytesIO(content), sheet_name="Month", header=None),
            "todate": pd.read_excel(BytesIO(content), sheet_name="Todate", header=None),
        }

    def read_history_workbook(self, content: bytes) -> dict[str, pd.DataFrame]:
        workbook = pd.ExcelFile(BytesIO(content))
        available_months = [sheet for sheet in self.MONTH_SHEETS if sheet in workbook.sheet_names]

        if not available_months:
            raise WorksheetMissingError("No monthly sheets found in history workbook.")

        return {
            month: pd.read_excel(BytesIO(content), sheet_name=month, header=None)
            for month in available_months
        }