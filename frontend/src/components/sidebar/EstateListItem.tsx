import type { EstateListItem as EstateListItemType } from "../../types/estate";
import { getStatusDot } from "../../utils/statusColors";
import { BarChart3 } from "lucide-react";

type Props = {
  estate: EstateListItemType;
  active: boolean;
  onClick: () => void;
};

function getCardTone(status: EstateListItemType["status"], active: boolean) {
  if (active) {
    return "border-dashboard-accent bg-dashboard-accentSoft shadow-soft";
  }

  switch (status) {
    case "red":
      return "border-red-200 bg-red-50 hover:border-red-600";
    case "orange":
      return "border-yellow-300 bg-yellow-20 hover:border-yellow-600";
    default:
      return "border-emerald-200 bg-emerald-50 hover:border-emerald-600";
  }
}

function formatCompactProfit(value?: number) {
  const safe = typeof value === "number" ? value : 0;
  const millions = safe / 1_000_000;
  const absMillions = Math.abs(millions);

  if (absMillions < 0.0005) {
    return "0M";
  }

  if (absMillions >= 1) {
    return `${new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    }).format(millions)}M`;
  }

  return `${millions.toFixed(3)}M`;
}

export function EstateListItem({ estate, active, onClick }: Props) {
  const budget = estate.profit_budget ?? 0;
  const actual = estate.profit_actual ?? 0;

  const actualClass =
    actual >= budget ? "text-dashboard-green" : actual < 0 ? "text-dashboard-red" : "text-dashboard-orange";

  return (
    <button
      onClick={onClick}
      className={[
        "min-h-[112px] w-full rounded-2xl border px-4 py-3 text-left transition-all duration-150",
        getCardTone(estate.status, active)
      ].join(" ")}
    >
      <div className="flex h-full flex-col justify-between gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${getStatusDot(estate.status)}`} />
              <span className="truncate text-base font-semibold text-dashboard-heading">
                {estate.name}
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1 text-right text-[11px] font-semibold uppercase tracking-[0.16em] text-dashboard-muted">
            <BarChart3 className="h-3.5 w-3.5" />
            <span>PBT</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-dashboard-border/70 pt-2">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dashboard-muted">
              Bud
            </div>
            <div className="mt-1 text-base font-bold text-dashboard-text">
              {formatCompactProfit(budget)}
            </div>
          </div>

          <div className="text-right">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dashboard-muted">
              Act
            </div>
            <div className={`mt-1 text-base font-bold ${actualClass}`}>
              {formatCompactProfit(actual)}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}