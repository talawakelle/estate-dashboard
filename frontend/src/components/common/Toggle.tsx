import { Button } from "./Button";
import type { Mode } from "../../types/dashboard";

type Props = {
  value: Mode;
  onChange: (mode: Mode) => void;
};

export function Toggle({ value, onChange }: Props) {
  return (
    <div className="inline-flex rounded-xl border border-dashboard-border bg-dashboard-panelSoft p-1">
      <Button
        active={value === "month"}
        onClick={() => onChange("month")}
        className="min-w-[86px] border-0 px-4 py-2 shadow-none"
      >
        Month
      </Button>
      <Button
        active={value === "todate"}
        onClick={() => onChange("todate")}
        className="min-w-[86px] border-0 px-4 py-2 shadow-none"
      >
        Todate
      </Button>
    </div>
  );
}