import { useState } from "react";
import { Toggle } from "../common/Toggle";
import { UploadPanel } from "../upload/UploadPanel";
import { Button } from "../common/Button";
import { EstateGroupSidebar } from "../sidebar/EstateGroupSidebar";
import type { Mode } from "../../types/dashboard";
import type { EstateGroup } from "../../types/estate";

type Props = {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  filename: string | null;
  onUpload: (
    currentMonthFile: File,
    currentYearFile?: File | null,
    previousMonthFile?: File | null,
    gsaCurrentFile?: File | null,
    gsaPreviousFile?: File | null,
  ) => void;
  selectedEstateKey?: string | null;
  showPreviousYearAnalysis?: boolean;
  onTogglePreviousYearAnalysis?: () => void;
  activeGroup?: EstateGroup | null;
  onGroupChange?: (group: EstateGroup | null) => void;
  query?: string;
  onQueryChange?: (value: string) => void;
};

export function Header({
  mode,
  onModeChange,
  filename,
  onUpload,
  selectedEstateKey = null,
  showPreviousYearAnalysis = false,
  onTogglePreviousYearAnalysis,
  activeGroup = null,
  onGroupChange,
  query = "",
  onQueryChange
}: Props) {
  const [showUploadPanel, setShowUploadPanel] = useState(false);

  const showEstateActions = mode === "month" && !!selectedEstateKey;
  const hideHeaderText = !!selectedEstateKey;

  return (
    <header className="rounded-panel border border-dashboard-border bg-dashboard-panel px-3 py-3 shadow-panel">
      {!hideHeaderText ? (
        <div className="space-y-3">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="min-w-0">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-dashboard-accent">
                Executive Analytics
              </div>

              <div className="mt-1.5 flex flex-col gap-2 xl:flex-row xl:items-center xl:gap-4">
                <h1 className="text-[2.1rem] font-bold leading-none tracking-tight text-dashboard-heading">
                  Performance Analysis Agent
                </h1>

                <Toggle value={mode} onChange={onModeChange} />
              </div>

              <p className="mt-1 text-sm text-dashboard-muted">
                Board-level estate insight with budget vs actual analysis
              </p>
            </div>

            <div className="xl:shrink-0 space-y-2">
              <button
                type="button"
                onClick={() => setShowUploadPanel((prev) => !prev)}
                className="rounded-xl border border-dashboard-accent bg-white px-3 py-2 text-sm font-medium text-dashboard-heading transition-colors hover:bg-dashboard-panelSoft"
              >
                {showUploadPanel ? "Hide 5-file upload" : "Show 5-file upload"}
              </button>

              {showUploadPanel ? (
                <UploadPanel filename={filename} onUpload={onUpload} />
              ) : null}
            </div>
          </div>

          <div className="rounded-2xl border border-dashboard-border bg-dashboard-panelSoft px-3 py-2">
            <EstateGroupSidebar
              activeGroup={activeGroup ?? null}
              onChange={onGroupChange ?? (() => {})}
              query={query}
              onQueryChange={onQueryChange ?? (() => {})}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="shrink-0">
            <Toggle value={mode} onChange={onModeChange} />
          </div>

          <div className="min-w-0 flex-1 rounded-2xl border border-dashboard-border bg-dashboard-panelSoft px-3 py-2">
            <EstateGroupSidebar
              activeGroup={activeGroup ?? null}
              onChange={onGroupChange ?? (() => {})}
              query={query}
              onQueryChange={onQueryChange ?? (() => {})}
            />
          </div>

          {showEstateActions ? (
            <div className="shrink-0">
              <Button onClick={onTogglePreviousYearAnalysis}>
                {showPreviousYearAnalysis
                  ? "Hide Previous Years Analysis"
                  : "Analysis with Previous Years"}
              </Button>
            </div>
          ) : null}
        </div>
      )}
    </header>
  );
}