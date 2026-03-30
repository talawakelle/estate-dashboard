from app.core.utils import safe_float


class KpiProcessor:
    def extract(self, row, mapping):
        return {
            "crop_budget": safe_float(row.iloc[mapping.crop_budget]),
            "crop_actual": safe_float(row.iloc[mapping.crop_actual]),
            "crop_achieved": safe_float(row.iloc[mapping.crop_achieved]),
            "crop_variance": safe_float(row.iloc[mapping.crop_variance]),
            "nsa_budget": safe_float(row.iloc[mapping.nsa_budget]),
            "nsa_actual": safe_float(row.iloc[mapping.nsa_actual]),
            "cop_budget": safe_float(row.iloc[mapping.cop_budget]),
            "cop_actual": safe_float(row.iloc[mapping.cop_actual]),
            "profit_budget": safe_float(row.iloc[mapping.profit_budget]),
            "profit_actual": safe_float(row.iloc[mapping.profit_actual]),
        }