export function Spinner() {
  return (
    <div className="flex min-h-[320px] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-dashboard-border border-t-dashboard-accent" />
        <p className="text-sm text-dashboard-muted">Loading dashboard...</p>
      </div>
    </div>
  );
}