import type { DashboardSummary, RankingItem } from "../../types/dashboard";

type Props = {
  summary: DashboardSummary;
};

function formatValue(value?: number) {
  if (value === undefined || value === null) return "-";
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}

function formatPercent(value?: number) {
  if (value === undefined || value === null) return "-";
  return `${value}%`;
}

function SummaryMiniCard({
  title,
  value
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-dashboard-border bg-white p-4 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-dashboard-muted">
        {title}
      </div>
      <div className="mt-2 text-2xl font-bold text-dashboard-heading">{value}</div>
    </div>
  );
}

function GsaRankCard({ item }: { item?: RankingItem }) {
  return (
    <div className="rounded-2xl border border-dashboard-border bg-white p-4 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-dashboard-muted">
        GSA Rank
      </div>

      <div className="mt-3">
        <div className="text-sm font-semibold text-dashboard-heading">
          {item?.name ?? "NSA"}
        </div>
        <div className="mt-1 text-2xl font-bold text-dashboard-heading">
          {item?.value?.toLocaleString?.() ?? "-"}
        </div>
      </div>
    </div>
  );
}

export function SummaryView({ summary }: Props) {
  const nsaOnly =
    summary.gsa_rank?.find((item) => item.name?.toUpperCase() === "NSA") ??
    summary.gsa_rank?.[0];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryMiniCard
          title="COP Budget"
          value={formatValue(summary.cop_budget)}
        />
        <SummaryMiniCard
          title="COP Actual"
          value={formatValue(summary.cop_actual)}
        />
        <SummaryMiniCard
          title="COP Variance"
          value={formatValue(summary.cop_variance)}
        />
        <GsaRankCard item={nsaOnly} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryMiniCard
          title="% Achieved"
          value={formatPercent(summary.achieved_percent)}
        />
      </div>
    </div>
  );
}