import { EstateHeader } from "./EstateHeader";
import { EstateKpiCards } from "./EstateKpiCards";
import { KpiChartsGrid } from "../charts/KpiChartsGrid";
import type { EstateDetail } from "../../types/estate";
import type { Mode } from "../../types/dashboard";

type Props = {
  estate: EstateDetail;
  mode: Mode;
  showPreviousYearAnalysis?: boolean;
};

export function EstateDetailView({
  estate,
  mode,
  showPreviousYearAnalysis = false
}: Props) {
  return (
    <div className="space-y-3">
      <EstateHeader estate={estate} />
      <EstateKpiCards kpis={estate.kpis} />
      <KpiChartsGrid
        kpis={estate.kpis}
        history={estate.history}
        mode={mode}
        showPreviousYearAnalysis={showPreviousYearAnalysis}
        periodLabels={estate.period_labels}
      />
    </div>
  );
}