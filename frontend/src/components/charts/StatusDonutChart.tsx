import ReactECharts from "echarts-for-react";
import type { SummaryCounts } from "../../types/dashboard";
import { chartPalette } from "./chartTheme";

type Props = {
  counts: SummaryCounts;
};

export function StatusDonutChart({ counts }: Props) {
  const option = {
    backgroundColor: "transparent",
    tooltip: { trigger: "item" },
    legend: {
      bottom: 0,
      icon: "circle",
      textStyle: { color: "#475569", fontSize: 12 }
    },
    series: [
      {
        type: "pie",
        radius: ["58%", "78%"],
        avoidLabelOverlap: true,
        itemStyle: {
          borderColor: "#ffffff",
          borderWidth: 2
        },
        label: {
          color: "#334155",
          fontWeight: 600,
          formatter: "{b}\n{c}"
        },
        data: [
          { value: counts.red, name: "Red", itemStyle: { color: chartPalette.red } },
          { value: counts.orange, name: "Orange", itemStyle: { color: chartPalette.orange } },
          { value: counts.green, name: "Green", itemStyle: { color: chartPalette.green } }
        ]
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />;
}