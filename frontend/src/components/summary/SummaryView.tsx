import type { DashboardSummary } from "../../types/dashboard";

type Props = {
  summary: DashboardSummary;
};

type MetricCard = {
  title: string;
  budget?: number;
  actual?: number;
  variance?: number;
  achieved_percent?: number;
  gsa?: number | null;
  rank?: number | null;
};

function formatValue(value?: number | null) {
  if (value === undefined || value === null) return "-";
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}

function formatPercent(value?: number | null) {
  if (value === undefined || value === null) return "-";
  return `${value}%`;
}

function formatPlain(value?: number | null) {
  if (value === undefined || value === null) return "-";
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}

function MetricCardView({
  card,
  showGsaForNsaOnly = false
}: {
  card: MetricCard;
  showGsaForNsaOnly?: boolean;
}) {
  const isNsa = card.title.trim().toUpperCase() === "NSA";
  const showGsaBlock = showGsaForNsaOnly && isNsa;

  return (
    <div className="rounded-2xl border border-dashboard-border bg-white p-5 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-dashboard-muted">
        {card.title}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-6">
        <div>
          <div className="text-xs text-dashboard-muted">Budget</div>
          <div className="mt-1 text-2xl font-bold text-dashboard-heading">
            {formatValue(card.budget)}
          </div>
        </div>

        <div>
          <div className="text-xs text-dashboard-muted">Actual</div>
          <div className="mt-1 text-2xl font-bold text-dashboard-heading">
            {formatValue(card.actual)}
          </div>
        </div>

        <div>
          <div className="text-xs text-dashboard-muted">Variance</div>
          <div className="mt-1 text-2xl font-bold text-dashboard-heading">
            {formatValue(card.variance)}
          </div>
        </div>
      </div>

      <div className="mt-5 border-t border-dashboard-border pt-4">
        <div className={showGsaBlock ? "grid grid-cols-3 gap-6 items-start" : "flex justify-center"}>
          {showGsaBlock ? (
            <>
              <div>
                <div className="text-xs text-dashboard-muted">GSA</div>
                <div className="mt-1 text-2xl font-bold text-dashboard-heading">
                  {formatPlain(card.gsa)}
                </div>
              </div>

              <div className="text-center">
                <div className="text-xs text-dashboard-muted">% Achieved</div>
                <div className="mt-1 text-2xl font-bold text-dashboard-heading">
                  {formatPercent(card.achieved_percent)}
                </div>
              </div>

              <div>
                <div className="text-xs text-dashboard-muted">Rank</div>
                <div className="mt-1 text-2xl font-bold text-dashboard-heading">
                  {formatPlain(card.rank)}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="text-xs text-dashboard-muted">% Achieved</div>
              <div className="mt-1 text-2xl font-bold text-dashboard-heading">
                {formatPercent(card.achieved_percent)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function SummaryView({ summary }: Props) {
  const nsaRankItem =
    summary.gsa_rank?.find((item) => item.name?.toUpperCase() === "NSA") ??
    summary.gsa_rank?.[0];

  const cards: MetricCard[] = [
    {
      title: "CROP",
      budget: 45326,
      actual: 42892,
      variance: -2434,
      achieved_percent: 95
    },
    {
      title: "NSA",
      budget: 1443,
      actual: 1321.64,
      variance: -121.36,
      achieved_percent: 92,
      gsa: nsaRankItem?.value ?? 0.03,
      rank: 2
    },
    {
      title: "COP",
      budget: summary.cop_budget,
      actual: summary.cop_actual,
      variance: summary.cop_variance,
      achieved_percent: summary.achieved_percent
    },
    {
      title: "PROFIT AFTER SUNDRY INCOME",
      budget: 20390380,
      actual: 17584341,
      variance: -2806039,
      achieved_percent: 86
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        {cards.map((card) => (
          <MetricCardView
            key={card.title}
            card={card}
            showGsaForNsaOnly
          />
        ))}
      </div>
    </div>
  );
}