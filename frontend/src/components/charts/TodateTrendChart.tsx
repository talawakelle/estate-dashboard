import ReactECharts from "echarts-for-react";
import type { EstateHistoryPoint, Kpi } from "../../types/estate";
import { chartPalette } from "./chartTheme";

type Props = {
  history: EstateHistoryPoint[];
  kpiKey: Kpi["key"];
};

function getHistoryFields(kpiKey: string) {
  const normalized = String(kpiKey).trim().toLowerCase();

  if (normalized === "crop") {
    return { budgetField: "crop_budget", actualField: "crop_actual" };
  }

  if (normalized === "nsa") {
    return { budgetField: "nsa_budget", actualField: "nsa_actual" };
  }

  if (normalized === "cop") {
    return { budgetField: "cop_budget", actualField: "cop_actual" };
  }

  return { budgetField: "profit_budget", actualField: "profit_actual" };
}

export function TodateTrendChart({ history, kpiKey }: Props) {
  const { budgetField, actualField } = getHistoryFields(kpiKey);

  const budgetData = history.map(
    (item) => Number(item[budgetField as keyof EstateHistoryPoint] ?? 0)
  );
  const actualData = history.map(
    (item) => Number(item[actualField as keyof EstateHistoryPoint] ?? 0)
  );

  const option = {
    backgroundColor: "transparent",
    animationDuration: 500,
    grid: {
      top: 20,
      right: 20,
      bottom: 75,
      left: 90
    },
    tooltip: {
      trigger: "axis"
    },
    legend: {
      bottom: 28,
      textStyle: { color: "#64748b" }
    },
    xAxis: {
      type: "category",
      data: history.map((item) => item.month),
      axisLine: {
        lineStyle: { color: "#cbd5e1" }
      },
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        color: "#64748b",
        fontSize: 12,
        interval: 0,
        margin: 16
      }
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: { color: "#cbd5e1" }
      },
      axisLabel: {
        color: "#64748b",
        formatter: (value: number) => {
          if (Math.abs(value) >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
          if (Math.abs(value) >= 1000) return `${(value / 1000).toFixed(0)}K`;
          return `${value}`;
        }
      },
      splitLine: {
        lineStyle: { color: "rgba(148, 163, 184, 0.20)" }
      }
    },
    series: [
      {
        name: "Budget",
        type: "line",
        smooth: true,
        symbolSize: 8,
        data: budgetData,
        lineStyle: {
          color: chartPalette.budget,
          width: 3
        },
        itemStyle: {
          color: chartPalette.budget
        }
      },
      {
        name: "Actual",
        type: "line",
        smooth: true,
        symbolSize: 8,
        data: actualData,
        lineStyle: {
          color: chartPalette.actual,
          width: 3
        },
        itemStyle: {
          color: chartPalette.actual
        }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: 320, width: "100%" }} />;
}