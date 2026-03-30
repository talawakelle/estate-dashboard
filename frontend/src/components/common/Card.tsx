import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  title?: string;
  subtitle?: string;
  className?: string;
}>;

export function Card({ title, subtitle, className = "", children }: Props) {
  return (
    <div
      className={[
        "rounded-panel border border-dashboard-border bg-dashboard-panel p-5 shadow-panel",
        className
      ].join(" ")}
    >
      {(title || subtitle) && (
        <div className="mb-4 border-b border-dashboard-border pb-3">
          {title && <h3 className="text-base font-semibold text-dashboard-heading">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-dashboard-muted">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}