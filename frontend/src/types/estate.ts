export type Status = "red" | "orange" | "green";
export type RowType = "operational" | "group" | "total";
export type EstateGroup = "HIGH GROWN" | "LOW GROWN" | "REPROCESS" | "CINNAMON";

export type Kpi = {
  key: string;
  label: string;
  budget: number;
  actual: number;
  achieved?: number | null;
  previous_year_budget?: number | null;
  previous_year_actual?: number | null;
  gsa?: number | null;
  rank?: number | null;
};

export type PeriodLabels = {
  prev_budget: string;
  prev_actual: string;
  budget: string;
  actual: string;
};

export type EstateHistoryPoint = {
  month: string;
  crop_budget: number;
  crop_actual: number;
  nsa_budget: number;
  nsa_actual: number;
  cop_budget: number;
  cop_actual: number;
  profit_budget: number;
  profit_actual: number;
};

export type CropSection = {
  crop_name: string;
  kpis: Kpi[];
};

export type EstateListItem = {
  id: string;
  key: string;
  name: string;
  order: number;
  row_type: RowType;
  status: Status;
  crop_variance: number;
  profit_actual: number;
  crop_budget?: number;
  crop_actual?: number;
  nsa_budget?: number;
  nsa_actual?: number;
  cop_budget?: number;
  cop_actual?: number;
  profit_budget?: number;
};

export type EstateDetail = EstateListItem & {
  kpis: Kpi[];
  crops: CropSection[];
  history?: EstateHistoryPoint[];
  period_labels?: PeriodLabels | null;
};