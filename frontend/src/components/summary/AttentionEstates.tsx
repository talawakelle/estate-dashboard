import { Card } from "../common/Card";
import type { RankingItem } from "../../types/dashboard";

type Props = {
  title: string;
  items: RankingItem[];
};

export function AttentionEstates({ title, items }: Props) {
  return (
    <Card title={title}>
      <div className="space-y-3">
        {items.length === 0 && <div className="text-sm text-dashboard-muted">No data available.</div>}
        {items.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between rounded-xl border border-dashboard-border bg-dashboard-panelMuted px-4 py-3"
          >
            <div className="text-sm text-dashboard-heading">{item.name}</div>
            <div className="text-sm font-semibold text-dashboard-text">{item.value.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}