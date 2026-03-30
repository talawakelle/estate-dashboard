from dataclasses import dataclass
from typing import Any


@dataclass
class ApiResponseModel:
    success: bool
    data: Any
    message: str = ""