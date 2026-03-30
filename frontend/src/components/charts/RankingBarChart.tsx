import ReactECharts from "echarts-for-react";
import type { RankingItem } from "../../types/dashboard";
import { axisStyle } from "../../utils/chartOptions";
import { chartPalette } from "./chartTheme";

type Props = {
  items: RankingItem[];
  title?: string;
};

export function RankingBarChart({ items }: Props) {
  const option = {
    backgroundColor: "transparent",
    tooltip: { trigger: "axis" },
    grid: { left: 80, right: 20, top: 20, bottom: 30, containLabel: true },
    xAxis: { type: "value", ...axisStyle },
    yAxis: {
      type: "category",
      data: items.map((item) => item.name),
      ...axisStyle
    },
    series: [
      {
        type: "bar",
        data: items.map((item) => ({
          value: item.value,
          itemStyle: {
            color:
              item.status === "red"
                ? chartPalette.red
                : item.status === "orange"
                ? chartPalette.orange
                : chartPalette.green
          }
        })),
        barMaxWidth: 24,
        borderRadius: [0, 8, 8, 0]
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />;
}