from enum import Enum


class ModeEnum(str, Enum):
    MONTH = "month"
    TODATE = "todate"


class StatusEnum(str, Enum):
    RED = "red"
    ORANGE = "orange"
    GREEN = "green"