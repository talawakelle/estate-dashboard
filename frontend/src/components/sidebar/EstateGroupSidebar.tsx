import type { EstateGroup } from "../../types/estate";
import { EstateSearch } from "./EstateSearch";
import { Layers3 } from "lucide-react";

type Props = {
  activeGroup: EstateGroup | null;
  onChange: (group: EstateGroup | null) => void;
  query: string;
  onQueryChange: (value: string) => void;
};

const groups: EstateGroup[] = ["HIGH GROWN", "LOW GROWN", "REPROCESS", "CINNAMON"];

export function EstateGroupSidebar({
  activeGroup,
  onChange,
  query,
  onQueryChange
}: Props) {
  return (
    <div className="flex min-w-0 items-center gap-2 overflow-hidden">
      <div className="mr-1 inline-flex shrink-0 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-dashboard-muted">
        <Layers3 className="h-4 w-4" />
        <span>Estate Groups</span>
      </div>

      <div className="flex min-w-0 items-center gap-2 overflow-x-auto">
        {groups.map((group) => (
          <button
            key={group}
            onClick={() => onChange(activeGroup === group ? null : group)}
            className={[
              "shrink-0 rounded-xl border px-3 py-2 text-sm font-semibold transition-all",
              activeGroup === group
                ? "border-dashboard-accent bg-dashboard-accent text-white shadow-soft"
                : "border-dashboard-border bg-dashboard-panel text-dashboard-text hover:bg-dashboard-panelMuted"
            ].join(" ")}
          >
            {group}
          </button>
        ))}
      </div>

      <div className="ml-auto min-w-[220px] max-w-[320px] shrink-0">
        <EstateSearch value={query} onChange={onQueryChange} />
      </div>
    </div>
  );
}