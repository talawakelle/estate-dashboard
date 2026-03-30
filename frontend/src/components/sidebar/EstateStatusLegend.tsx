export function EstateStatusLegend() {
  return (
    <div className="grid grid-cols-1 gap-3 rounded-panel border border-dashboard-border bg-dashboard-panel p-4 text-sm shadow-panel">
      <div className="flex items-center gap-2 text-dashboard-text">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
        <span>Red = Loss making estate</span>
      </div>
      <div className="flex items-center gap-2 text-dashboard-text">
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
        <span>Orange = Profit, but crop +/- is negative</span>
      </div>
      <div className="flex items-center gap-2 text-dashboard-text">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        <span>Green = Good estate</span>
      </div>
    </div>
  );
}