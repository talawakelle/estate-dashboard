from app.services.status_service import StatusService


def test_status_red():
    service = StatusService()
    assert service.get_status(-10, 5) == "red"


def test_status_orange():
    service = StatusService()
    assert service.get_status(10, -1) == "orange"


def test_status_green():
    service = StatusService()
    assert service.get_status(10, 1) == "green"