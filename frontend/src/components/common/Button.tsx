import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  active?: boolean;
};

export function Button({ children, active, className = "", ...props }: Props) {
  return (
    <button
      className={[
        "rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-150",
        active
          ? "border-dashboard-accent bg-dashboard-accent text-white shadow-soft"
          : "border-dashboard-border bg-dashboard-panel text-dashboard-text hover:border-dashboard-borderStrong hover:bg-dashboard-panelSoft",
        className
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}