import type { EstateDetail } from "../../types/estate";
import { ArrowLeft } from "lucide-react";

type Props = {
  estate: EstateDetail;
};

function getStatusClasses(status: string) {
  const normalized = status.toLowerCase();

  if (normalized === "green") {
    return {
      card: "border-emerald-300 bg-emerald-50"
    };
  }

  if (normalized === "orange") {
    return {
      card: "border-amber-300 bg-amber-50"
    };
  }

  return {
    card: "border-rose-300 bg-rose-50"
  };
}

export function EstateHeader({ estate }: Props) {
  const colors = getStatusClasses(estate.status);

  return (
    <div className={`rounded-2xl border px-4 py-2.5 ${colors.card}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            Estate Detail
          </div>
          <h2 className="mt-0.5 truncate text-[1.1rem] font-bold tracking-tight text-slate-900">
            {estate.name}
          </h2>
        </div>

        <button
          onClick={() => window.dispatchEvent(new CustomEvent("estate-back-to-summary"))}
          className="inline-flex items-center gap-2 rounded-full border border-dashboard-border bg-white px-3 py-1.5 text-sm font-medium text-dashboard-text hover:bg-dashboard-panelMuted"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>
    </div>
  );
}