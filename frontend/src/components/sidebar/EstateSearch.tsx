import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function EstateSearch({ value, onChange }: Props) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dashboard-subtle" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search estates..."
        className="w-full rounded-xl border border-dashboard-border bg-dashboard-panel pl-10 pr-4 py-3 text-sm text-dashboard-text outline-none placeholder:text-dashboard-subtle focus:border-dashboard-accent focus:ring-2 focus:ring-dashboard-accent/10"
      />
    </div>
  );
}