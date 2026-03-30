import { EmptyState } from "../common/EmptyState";
import { Spinner } from "../common/Spinner";
import { EstateDetailView } from "../estate/EstateDetailView";
import { SummaryView } from "../summary/SummaryView";
import type { DashboardSummary, EstateDetail, Mode } from "../../types/dashboard";

type Props = {
  loading: boolean;
  error: string | null;
  summary: DashboardSummary | null;
  selectedEstate: EstateDetail | null;
  mode: Mode;
  showPreviousYearAnalysis?: boolean;
};

export function MainPanel({
  loading,
  error,
  summary,
  selectedEstate,
  mode,
  showPreviousYearAnalysis = false
}: Props) {
  if (loading) return <Spinner />;

  if (error) {
    return (
      <EmptyState
        title="Dashboard not ready"
        description={error}
      />
    );
  }

  if (selectedEstate) {
    return (
      <div className="pr-1">
        <EstateDetailView
          estate={selectedEstate}
          mode={mode}
          showPreviousYearAnalysis={showPreviousYearAnalysis}
        />
      </div>
    );
  }

  if (summary) {
    return (
      <div className="pr-1">
        <SummaryView summary={summary} />
      </div>
    );
  }

  return (
    <EmptyState
      title="Upload a workbook to start"
      description="Add your monthly workbook first. You can also include history and previous-year files for richer analysis."
    />
  );
}