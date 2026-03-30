from dataclasses import dataclass


@dataclass
class ColumnIndexMap:
    serial: int = 0
    name: int = 1

    # CROP (kg)
    crop_budget: int = 4
    crop_actual: int = 5
    crop_achieved: int = 6

    # Yield per ha +/-  -> this is the status logic field
    crop_variance: int = 9

    # NSA
    nsa_budget: int = 10
    nsa_actual: int = 11

    # COP
    cop_budget: int = 12
    cop_actual: int = 13

    # Profit after Sundry Income
    profit_budget: int = 26
    profit_actual: int = 27


class ColumnMapper:
    def get_map(self, dataframe) -> ColumnIndexMap:
        return ColumnIndexMap()