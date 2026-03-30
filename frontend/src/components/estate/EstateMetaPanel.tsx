import { Card } from "../common/Card";
import type { EstateDetail, Kpi } from "../../types/estate";
import { formatNumber } from "../../utils/formatters";

type Props = {
  estate: EstateDetail;
};

function formatPercent(value: number) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

function findProfitBudget(kpis: Kpi[]) {
  const profitKpi = kpis.find((kpi) => {
    const label = kpi.label.trim().toLowerCase();
    return (
      label === "profit after sundry income" ||
      label.includes("profit after sundry income") ||
      label === "profit" ||
      label.includes("profit")
    );
  });

  return profitKpi?.budget ?? 0;
}

export function EstateMetaPanel({ estate }: Props) {
  const actualProfit = estate.profit_actual ?? 0;
  const budgetProfit = findProfitBudget(estate.kpis ?? []);

  const profitAchievementPercent =
    budgetProfit !== 0 ? ((actualProfit - budgetProfit) / budgetProfit) * 100 : 0;

  const profitAchievementClass =
    profitAchievementPercent < 0
      ? "text-dashboard-red"
      : profitAchievementPercent > 0
        ? "text-dashboard-green"
        : "text-dashboard-muted";

  return (
    <Card title="Estate Meta">
      <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
        <div className="rounded-xl bg-dashboard-panelMuted p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-dashboard-muted">
            Row Type
          </div>
          <div className="mt-2 text-base font-semibold text-dashboard-heading">
            {estate.row_type}
          </div>
        </div>

        <div className="rounded-xl bg-dashboard-panelMuted p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-dashboard-muted">
            Profit Actual
          </div>
          <div className="mt-2 text-base font-semibold text-dashboard-heading">
            {formatNumber(actualProfit)}
          </div>
        </div>

        <div className="rounded-xl bg-dashboard-panelMuted p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-dashboard-muted">
            Budget Profit
          </div>
          <div className="mt-2 text-base font-semibold text-dashboard-heading">
            {formatNumber(budgetProfit)}
          </div>
        </div>

        <div className="rounded-xl bg-dashboard-panelMuted p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-dashboard-muted">
            Profit Achievement %
          </div>
          <div className={`mt-2 text-base font-semibold ${profitAchievementClass}`}>
            {formatPercent(profitAchievementPercent)}
          </div>
        </div>
      </div>
    </Card>
  );
}