import ReactECharts from "echarts-for-react";
import type { Kpi, PeriodLabels } from "../../types/estate";
import { chartPalette } from "./chartTheme";

type Props = {
  kpi: Kpi;
  showPreviousYearAnalysis?: boolean;
  periodLabels?: PeriodLabels | null;
};

function formatFullNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0
  }).format(Number(value ?? 0));
}

export function SingleKpiBarChart({
  kpi,
  showPreviousYearAnalysis = false,
  periodLabels
}: Props) {
  const hasPreviousYear =
    typeof kpi.previous_year_budget === "number" &&
    typeof kpi.previous_year_actual === "number";

  const usePreviousYear = showPreviousYearAnalysis && hasPreviousYear;

  const categories = usePreviousYear
    ? [
        periodLabels?.prev_budget ?? "Prev Budget",
        periodLabels?.prev_actual ?? "Prev Actual",
        periodLabels?.budget ?? "Budget",
        periodLabels?.actual ?? "Actual"
      ]
    : [
        periodLabels?.budget ?? "Budget",
        periodLabels?.actual ?? "Actual"
      ];

  const values = usePreviousYear
    ? [
        Number(kpi.previous_year_budget ?? 0),
        Number(kpi.previous_year_actual ?? 0),
        Number(kpi.budget ?? 0),
        Number(kpi.actual ?? 0)
      ]
    : [Number(kpi.budget ?? 0), Number(kpi.actual ?? 0)];

  const colors = usePreviousYear
    ? [
        "#a78bfa",
        "#7c3aed",
        chartPalette.budget,
        chartPalette.actual
      ]
    : [chartPalette.budget, chartPalette.actual];

  const option = {
    backgroundColor: "transparent",
    animationDuration: 400,
    grid: {
      top: 18,
      right: 18,
      bottom: 42,
      left: 110
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params: any[]) => {
        if (!Array.isArray(params) || params.length === 0) return "";
        const lines = params.map(
          (item) => `${item.marker} ${item.name}: ${formatFullNumber(item.value)}`
        );
        return lines.join("<br/>");
      }
    },
    xAxis: {
      type: "category",
      data: categories,
      axisLine: {
        lineStyle: { color: "#cbd5e1" }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: "#64748b",
        fontSize: 11,
        margin: 10,
        interval: 0,
        rotate: 0
      }
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: "#64748b",
        formatter: (value: number) => formatFullNumber(value)
      },
      splitLine: {
        lineStyle: { color: "rgba(148, 163, 184, 0.16)" }
      }
    },
    series: [
      {
        type: "bar",
        data: values.map((value, index) => ({
          value,
          itemStyle: {
            color: colors[index],
            borderRadius: [5, 5, 0, 0]
          }
        })),
        barWidth: usePreviousYear ? 28 : 42,
        barCategoryGap: usePreviousYear ? "18%" : "28%"
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: 280, width: "100%" }} />;
}