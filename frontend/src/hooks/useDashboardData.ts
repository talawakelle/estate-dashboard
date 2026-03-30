import { AxiosError } from "axios";
import { useEffect } from "react";
import { fetchEstateDetail, fetchEstates, fetchSummary } from "../api/dashboardApi";
import { useDashboardStore } from "../store/dashboardStore";

function getErrorMessage(error: unknown) {
  if (error instanceof AxiosError) {
    return error.response?.data?.detail ?? error.message ?? "Failed to load dashboard.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Failed to load dashboard.";
}

export function useDashboardData() {
  const mode = useDashboardStore((s) => s.mode);
  const selectedEstateKey = useDashboardStore((s) => s.selectedEstateKey);
  const setEstates = useDashboardStore((s) => s.setEstates);
  const setSummary = useDashboardStore((s) => s.setSummary);
  const setSelectedEstate = useDashboardStore((s) => s.setSelectedEstate);
  const setLoading = useDashboardStore((s) => s.setLoading);
  const setError = useDashboardStore((s) => s.setError);

  async function loadAll() {
    try {
      setLoading(true);
      setError(null);
      const [summary, estates] = await Promise.all([fetchSummary(mode), fetchEstates(mode)]);
      setSummary(summary);
      setEstates(estates);

      if (selectedEstateKey) {
        const detail = await fetchEstateDetail(mode, selectedEstateKey);
        setSelectedEstate(detail);
      } else {
        setSelectedEstate(null);
      }
    } catch (error) {
      setError(getErrorMessage(error));
      setSummary(null);
      setEstates([]);
      setSelectedEstate(null);
    } finally {
      setLoading(false);
    }
  }

  async function reloadSelectedEstate() {
    if (!selectedEstateKey) {
      setSelectedEstate(null);
      return;
    }
    try {
      const detail = await fetchEstateDetail(mode, selectedEstateKey);
      setSelectedEstate(detail);
    } catch {
      setSelectedEstate(null);
    }
  }

  useEffect(() => {
    loadAll();
  }, [mode]);

  useEffect(() => {
    reloadSelectedEstate();
  }, [selectedEstateKey]);

  return { loadAll };
}
