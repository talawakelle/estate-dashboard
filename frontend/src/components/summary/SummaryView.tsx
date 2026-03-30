
import { AttentionEstates } from "./AttentionEstates";

import { ChartCard } from "../charts/ChartCard";
import { BudgetActualBarChart } from "../charts/BudgetActualBarChart";
import type { DashboardSummary } from "../../types/dashboard";

type Props = {
  summary: DashboardSummary;
};

export function SummaryView({ summary }: Props) {
  const overviewKpis = summary.estates.slice(0, 8).map((estate) => ({
    key: estate.key,
    label: estate.name,
    budget: 0,
    actual: estate.profit_actual
  }));

  return (
    <div className="space-y-6">
   

      

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        
      </div>

      
    </div>
  );
}