import { Card } from "../common/Card";
import type { EstateHistoryPoint, Kpi, PeriodLabels } from "../../types/estate";
import { SingleKpiBarChart } from "./SingleKpiBarChart";
import { TodateTrendChart } from "./TodateTrendChart";

type Props = {
  kpis: Kpi[];
  history?: EstateHistoryPoint[];
  mode?: "month" | "todate";
  showPreviousYearAnalysis?: boolean;
  periodLabels?: PeriodLabels | null;
};

export function KpiChartsGrid({
  kpis,
  history = [],
  mode = "month",
  showPreviousYearAnalysis = false,
  periodLabels
}: Props) {
  const useTrendChart = mode === "todate" && history.length > 0;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {kpis.map((kpi) => (
        <Card
          key={kpi.key}
          title={kpi.label}
          className="min-h-[360px]"
        >
          {useTrendChart ? (
            <TodateTrendChart history={history} kpiKey={kpi.key} />
          ) : (
            <SingleKpiBarChart
              kpi={kpi}
              showPreviousYearAnalysis={showPreviousYearAnalysis}
              periodLabels={periodLabels}
            />
          )}
        </Card>
      ))}
    </div>
  );
}