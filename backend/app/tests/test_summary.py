from app.mappers.summary_mapper import SummaryMapper
from app.models.estate import EstateModel


def test_summary_counts():
    mapper = SummaryMapper()
    estates = [
        EstateModel("1", "a", "A", 1, "operational", "red", -1, -10),
        EstateModel("2", "b", "B", 2, "operational", "orange", -1, 10),
        EstateModel("3", "c", "C", 3, "operational", "green", 1, 20),
    ]
    summary = mapper.build_summary("month", estates)
    assert summary.counts.red == 1
    assert summary.counts.orange == 1
    assert summary.counts.green == 1