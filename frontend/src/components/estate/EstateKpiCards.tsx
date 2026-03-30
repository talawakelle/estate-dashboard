import { Card } from "../common/Card";
import type { Kpi } from "../../types/estate";
import { formatNumber } from "../../utils/formatters";

type Props = {
  kpis: Kpi[];
};

function formatAchieved(value: number) {
  return `${(value * 100).toFixed(0)}%`;
}

function isCopKpi(kpi: Kpi) {
  const key = kpi.key.trim().toLowerCase();
  const label = kpi.label.trim().toLowerCase();
  return key === "cop" || label === "cop";
}

function isNsaKpi(kpi: Kpi) {
  const key = kpi.key.trim().toLowerCase();
  const label = kpi.label.trim().toLowerCase();
  return key === "nsa" || label === "nsa";
}

function getAchieved(kpi: Kpi) {
  if (typeof kpi.achieved === "number") {
    return kpi.achieved;
  }

  const budget = Number(kpi.budget ?? 0);
  const actual = Number(kpi.actual ?? 0);

  if (budget <= 0 || actual <= 0) {
    return null;
  }

  if (isCopKpi(kpi)) {
    return budget / actual;
  }

  return actual / budget;
}

function getActualValueClass(kpi: Kpi, achieved: number | null) {
  if (typeof achieved !== "number") {
    return "text-dashboard-heading";
  }

  return achieved >= 1 ? "text-dashboard-green" : "text-dashboard-red";
}

function getVarianceValueClass(kpi: Kpi, varianceValue: number) {
  if (isCopKpi(kpi)) {
    return varianceValue <= 0 ? "text-dashboard-green" : "text-dashboard-red";
  }

  return varianceValue < 0
    ? "text-dashboard-red"
    : varianceValue > 0
      ? "text-dashboard-green"
      : "text-dashboard-muted";
}

function getAchievedClass(achieved: number | null) {
  if (typeof achieved !== "number") {
    return "text-dashboard-muted";
  }

  return achieved >= 1 ? "text-dashboard-green" : "text-dashboard-red";
}

export function EstateKpiCards({ kpis }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => {
        const varianceValue = kpi.actual - kpi.budget;
        const achieved = getAchieved(kpi);

        const actualValueClass = getActualValueClass(kpi, achieved);
        const varianceValueClass = getVarianceValueClass(kpi, varianceValue);
        const achievedClass = getAchievedClass(achieved);
        const showGsaForThisCard = isNsaKpi(kpi);

        return (
          <Card key={kpi.key} className="relative overflow-hidden">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-dashboard-muted">
              {kpi.label}
            </div>

            <div className="mt-3 grid grid-cols-3 gap-4 border-b border-dashboard-border pb-3">
              <div>
                <div className="text-xs text-dashboard-muted">Budget</div>
                <div className="mt-1 text-base font-semibold text-dashboard-text">
                  {formatNumber(kpi.budget)}
                </div>
              </div>

              <div>
                <div className="text-xs text-dashboard-muted">Actual</div>
                <div className={`mt-1 text-base font-semibold ${actualValueClass}`}>
                  {formatNumber(kpi.actual)}
                </div>
              </div>

              <div>
                <div className="text-xs text-dashboard-muted">Variance</div>
                <div className={`mt-1 text-base font-semibold ${varianceValueClass}`}>
                  {formatNumber(varianceValue)}
                </div>
              </div>
            </div>

            <div className="pt-3">
              {showGsaForThisCard ? (
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div>
                    <div className="text-xs text-dashboard-muted">GSA</div>
                    <div className="mt-1 text-sm font-bold leading-none text-dashboard-heading">
                      {typeof kpi.gsa === "number" ? formatNumber(kpi.gsa) : "-"}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-xs text-dashboard-muted">% Achieved</div>
                    <div className={`mt-1 text-base font-semibold ${achievedClass}`}>
                      {typeof achieved === "number" ? formatAchieved(achieved) : "-"}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-dashboard-muted">Rank</div>
                    <div className="mt-1 text-sm font-bold leading-none text-dashboard-heading">
                      {typeof kpi.rank === "number" ? kpi.rank : "-"}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div className="text-center">
                    <div className="text-xs text-dashboard-muted">% Achieved</div>
                    <div className={`mt-1 text-base font-semibold ${achievedClass}`}>
                      {typeof achieved === "number" ? formatAchieved(achieved) : "-"}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}