import { useDashboardStore } from "../store/dashboardStore";

export function useEstateSelection() {
  const selectedEstateKey = useDashboardStore((s) => s.selectedEstateKey);
  const setSelectedEstateKey = useDashboardStore((s) => s.setSelectedEstateKey);

  return {
    selectedEstateKey,
    selectEstate: setSelectedEstateKey
  };
}