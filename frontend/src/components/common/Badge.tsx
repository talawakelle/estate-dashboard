import type { PropsWithChildren } from "react";

export function Badge({ children }: PropsWithChildren) {
  return (
    <span className="inline-flex items-center rounded-full border border-dashboard-border bg-dashboard-panelMuted px-3 py-1 text-xs font-semibold text-dashboard-text">
      {children}
    </span>
  );
}