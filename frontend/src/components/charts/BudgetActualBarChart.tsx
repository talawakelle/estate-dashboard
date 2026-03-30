import ReactECharts from "echarts-for-react";
import type { Kpi } from "../../types/estate";
import { axisStyle, baseTextStyle } from "../../utils/chartOptions";
import { chartPalette } from "./chartTheme";

type Props = {
  title?: string;
  items: Kpi[];
};

export function BudgetActualBarChart({ items }: Props) {
  const option = {
    backgroundColor: "transparent",
    tooltip: { trigger: "axis" },
    legend: {
      textStyle: baseTextStyle
    },
    grid: { left: 40, right: 20, top: 40, bottom: 40, containLabel: true },
    xAxis: {
      type: "category",
      data: items.map((item) => item.label),
      ...axisStyle
    },
    yAxis: {
      type: "value",
      ...axisStyle
    },
    series: [
      {
        name: "Budget",
        type: "bar",
        data: items.map((item) => item.budget),
        itemStyle: { color: chartPalette.budget },
        barMaxWidth: 28,
        borderRadius: [8, 8, 0, 0]
      },
      {
        name: "Actual",
        type: "bar",
        data: items.map((item) => item.actual),
        itemStyle: {
          color: (params: { value: number }) =>
            params.value < 0 ? chartPalette.negative : chartPalette.actual
        },
        barMaxWidth: 28,
        borderRadius: [8, 8, 0, 0]
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />;
}