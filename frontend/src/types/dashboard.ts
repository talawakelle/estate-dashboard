import type { EstateDetail, EstateListItem, Status } from "./estate";

export type Mode = "month" | "todate";

export type SummaryCounts = {
  total: number;
  red: number;
  orange: number;
  green: number;
};

export type RankingItem = {
  key: string;
  name: string;
  value: number;
  status: Status;
};

export type DashboardSummary = {
  mode: Mode;
  counts: SummaryCounts;
  estates: EstateListItem[];
  top_loss: RankingItem[];
  below_budget: RankingItem[];
};

export type { EstateListItem, EstateDetail };