import type { RankingItem } from "../../types/dashboard";

type Props = {
  title: string;
  items: RankingItem[];
};

export function RankingPanel({ title, items }: Props) {
  return (
    <div className="rounded-2xl border border-dashboard-border bg-white p-4 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-dashboard-muted">
        {title}
      </div>

      <div className="mt-4 space-y-3">
        {items.length === 0 ? (
          <div className="text-sm text-dashboard-muted">No ranking data</div>
        ) : (
          items.map((item, index) => (
            <div
              key={item.key}
              className="flex items-center justify-between rounded-xl border border-dashboard-border px-3 py-2"
            >
              <div className="flex items-center gap-3">
                <div className="text-sm font-bold text-dashboard-heading">
                  {index + 1}
                </div>
                <div>
                  <div className="text-sm font-semibold text-dashboard-heading">
                    {item.name}
                  </div>
                  <div className="text-xs text-dashboard-muted">
                    {item.status}
                  </div>
                </div>
              </div>

              <div className="text-sm font-bold text-dashboard-heading">
                {item.value.toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}