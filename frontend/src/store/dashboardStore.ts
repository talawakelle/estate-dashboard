import { create } from "zustand";
import type { DashboardSummary, EstateDetail, EstateListItem, Mode } from "../types/dashboard";

type DashboardStore = {
  mode: Mode;
  filename: string | null;
  estates: EstateListItem[];
  summary: DashboardSummary | null;
  selectedEstateKey: string | null;
  selectedEstate: EstateDetail | null;
  loading: boolean;
  error: string | null;
  setMode: (mode: Mode) => void;
  setFilename: (filename: string | null) => void;
  setEstates: (estates: EstateListItem[]) => void;
  setSummary: (summary: DashboardSummary | null) => void;
  setSelectedEstateKey: (key: string | null) => void;
  setSelectedEstate: (estate: EstateDetail | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useDashboardStore = create<DashboardStore>((set) => ({
  mode: "month",
  filename: null,
  estates: [],
  summary: null,
  selectedEstateKey: null,
  selectedEstate: null,
  loading: false,
  error: null,
  setMode: (mode) => set({ mode }),
  setFilename: (filename) => set({ filename }),
  setEstates: (estates) => set({ estates }),
  setSummary: (summary) => set({ summary }),
  setSelectedEstateKey: (selectedEstateKey) => set({ selectedEstateKey }),
  setSelectedEstate: (selectedEstate) => set({ selectedEstate }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error })
}));