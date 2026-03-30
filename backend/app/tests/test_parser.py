import pandas as pd

from app.services.parser_service import ParserService
from app.services.status_service import StatusService


def test_parser_returns_rows():
    row = [1, "Estate A", 0, 0, 0, 0, 100, 90, -10, 0, 0, 0, 50, 48, 0, 0, 0, 0, 20, 25, 0, 0, 0, 0, 0, 0, 200, 150]
    df = pd.DataFrame([row])

    parser = ParserService(status_service=StatusService())
    data = parser.parse_dataframe(df)

    assert len(data) == 1
    assert data[0].name == "Estate A"