import { useDashboardStore } from "../store/dashboardStore";
import type { Mode } from "../types/dashboard";

export function useModeToggle() {
  const mode = useDashboardStore((s) => s.mode);
  const setMode = useDashboardStore((s) => s.setMode);

  return {
    mode,
    setMode: (nextMode: Mode) => setMode(nextMode)
  };
}