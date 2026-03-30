import { useEffect, useMemo, useState } from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { Header } from "../components/layout/Header";
import { MainPanel } from "../components/layout/MainPanel";
import { useDashboardData } from "../hooks/useDashboardData";
import { useDashboardStore } from "../store/dashboardStore";
import { useUploadWorkbook } from "../hooks/useUploadWorkbook";
import { EstateList } from "../components/sidebar/EstateList";
import { Card } from "../components/common/Card";
import type { EstateGroup, EstateListItem } from "../types/estate";

const GROUP_NAMES: Record<EstateGroup, string[]> = {
  "HIGH GROWN": [
    "Calsay",
    "Clarendon_EL",
    "Dessford",
    "Somerset",
    "Great_Western",
    "Mattakelle",
    "Palmerston",
    "Radella",
    "Bearwell",
    "Holyrood",
    "Logie",
    "Wattegodde"
  ],
  "LOW GROWN": [
    "Moragalla_EL",
    "Moragalla_Fact_BL",
    "Moragalla_Combined",
    "Deniyaya_EL",
    "Deniyaya_BL",
    "Deniyaya_Combined",
    "Indola_EL",
    "Kganga_EL",
    "Kganga_BL",
    "Kganga_Combined"
  ],
  REPROCESS: [
    "Pitiagoda_Factory",
    "Wangi_Oya_Process",
    "Calsay_Process"
  ],
  CINNAMON: [
    "Moragalla_Cinnamon",
    "Deniyaya_Cinnamon",
    "Indola_Cinnamon"
  ]
};

function normalizeEstateValue(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ");
}

const GROUP_NAME_SETS: Record<EstateGroup, Set<string>> = {
  "HIGH GROWN": new Set(GROUP_NAMES["HIGH GROWN"].map(normalizeEstateValue)),
  "LOW GROWN": new Set(GROUP_NAMES["LOW GROWN"].map(normalizeEstateValue)),
  REPROCESS: new Set(GROUP_NAMES.REPROCESS.map(normalizeEstateValue)),
  CINNAMON: new Set(GROUP_NAMES.CINNAMON.map(normalizeEstateValue))
};

function getEstateGroup(estate: { key: string; name: string }): EstateGroup | null {
  const normalizedKey = normalizeEstateValue(estate.key);
  const normalizedName = normalizeEstateValue(estate.name);

  for (const [group, names] of Object.entries(GROUP_NAME_SETS) as [EstateGroup, Set<string>][]) {
    if (names.has(normalizedName) || names.has(normalizedKey)) {
      return group;
    }
  }

  return null;
}

function mergeUniqueEstates(a: EstateListItem[], b: EstateListItem[]) {
  const map = new Map<string, EstateListItem>();

  for (const estate of [...a, ...b]) {
    map.set(estate.key, estate);
  }

  return Array.from(map.values());
}

export function DashboardPage() {
  const mode = useDashboardStore((s) => s.mode);
  const filename = useDashboardStore((s) => s.filename);
  const estates = useDashboardStore((s) => s.estates);
  const summary = useDashboardStore((s) => s.summary);
  const selectedEstateKey = useDashboardStore((s) => s.selectedEstateKey);
  const selectedEstate = useDashboardStore((s) => s.selectedEstate);
  const loading = useDashboardStore((s) => s.loading);
  const error = useDashboardStore((s) => s.error);
  const setMode = useDashboardStore((s) => s.setMode);
  const setSelectedEstateKey = useDashboardStore((s) => s.setSelectedEstateKey);

  const { loadAll } = useDashboardData();
  const { upload } = useUploadWorkbook(loadAll);

  const [activeGroup, setActiveGroup] = useState<EstateGroup | null>(null);
  const [query, setQuery] = useState("");
  const [showPreviousYearAnalysis, setShowPreviousYearAnalysis] = useState(false);

  useEffect(() => {
    const handler = () => {
      setSelectedEstateKey(null);
      setShowPreviousYearAnalysis(false);
    };

    window.addEventListener("estate-back-to-summary", handler);
    return () => window.removeEventListener("estate-back-to-summary", handler);
  }, [setSelectedEstateKey]);

  const sourceEstates = useMemo(() => {
    return mergeUniqueEstates(estates, summary?.estates ?? []);
  }, [estates, summary]);

  const allowedEstates = useMemo(() => {
    return sourceEstates.filter((estate) => getEstateGroup(estate) !== null);
  }, [sourceEstates]);

  const visibleEstates = useMemo(() => {
    const normalizedQuery = normalizeEstateValue(query);

    return allowedEstates.filter((estate) => {
      const estateGroup = getEstateGroup(estate);
      const matchesGroup = activeGroup ? estateGroup === activeGroup : true;
      const matchesSearch =
        !normalizedQuery ||
        normalizeEstateValue(estate.name).includes(normalizedQuery) ||
        normalizeEstateValue(estate.key).includes(normalizedQuery);

      return matchesGroup && matchesSearch;
    });
  }, [allowedEstates, activeGroup, query]);

  return (
    <DashboardLayout
      header={
        <Header
          mode={mode}
          onModeChange={(nextMode) => {
            setMode(nextMode);
            setShowPreviousYearAnalysis(false);
          }}
          filename={filename}
          onUpload={upload}
          selectedEstateKey={selectedEstateKey}
          showPreviousYearAnalysis={showPreviousYearAnalysis}
          onTogglePreviousYearAnalysis={() =>
            setShowPreviousYearAnalysis((prev) => !prev)
          }
          activeGroup={activeGroup}
          onGroupChange={(group) => {
            setActiveGroup(group);
            setSelectedEstateKey(null);
            setShowPreviousYearAnalysis(false);
          }}
          query={query}
          onQueryChange={(value) => {
            setQuery(value);
            setSelectedEstateKey(null);
            setShowPreviousYearAnalysis(false);
          }}
        />
      }
      sidebar={null}
      estatesSection={
        !selectedEstateKey ? (
          <Card className="p-0">
            <div className="px-4 py-3">
              <EstateList
                estates={visibleEstates}
                selectedEstateKey={selectedEstateKey}
                onSelect={(key) => {
                  setSelectedEstateKey(key);
                  setShowPreviousYearAnalysis(false);
                }}
                query=""
              />
            </div>
          </Card>
        ) : null
      }
    >
      <MainPanel
        loading={loading}
        error={error}
        summary={summary}
        selectedEstate={selectedEstate}
        mode={mode}
        showPreviousYearAnalysis={showPreviousYearAnalysis}
      />
    </DashboardLayout>
  );
}