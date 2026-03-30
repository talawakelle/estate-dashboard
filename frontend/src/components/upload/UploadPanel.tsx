import { useMemo, useRef, useState } from "react";
import { CalendarDays, FileText, FolderClock, History, TrendingUp, Upload } from "lucide-react";
import { UploadStatus } from "./UploadStatus";
import { Button } from "../common/Button";

type Props = {
  filename: string | null;
  onUpload: (
    currentMonthFile: File,
    currentYearFile?: File | null,
    previousMonthFile?: File | null,
    gsaCurrentFile?: File | null,
    gsaPreviousFile?: File | null,
  ) => void;
};

function extractMonthLabelFromName(rawName: string | null | undefined) {
  if (!rawName) return "Month";

  const firstFileName = rawName.split(" + ")[0]?.trim() ?? rawName;

  const name = firstFileName
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const match = name.match(
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})\b/i
  );

  if (match) {
    const month = match[1];
    const year = match[2];
    return `${month.charAt(0).toUpperCase()}${month.slice(1).toLowerCase()} ${year}`;
  }

  return name || "Month";
}

type SlotProps = {
  label: string;
  icon: React.ReactNode;
  file: File | null;
  onPick: () => void;
  required?: boolean;
};

function UploadSlot({ label, icon, file, onPick, required }: SlotProps) {
  return (
    <button
      type="button"
      onClick={onPick}
      className="flex min-w-[210px] flex-1 items-start gap-3 rounded-xl border border-dashboard-border bg-white px-4 py-3 text-left transition-colors hover:bg-dashboard-panelSoft"
    >
      <div className="mt-0.5 text-dashboard-muted">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-sm font-medium text-dashboard-heading">
          <span>{label}</span>
          {required ? <span className="text-xs text-dashboard-red">required</span> : null}
        </div>
        <div className="mt-1 truncate text-xs text-dashboard-muted">
          {file?.name ?? "Choose file"}
        </div>
      </div>
    </button>
  );
}

export function UploadPanel({ filename, onUpload }: Props) {
  const currentMonthInputRef = useRef<HTMLInputElement | null>(null);
  const currentYearInputRef = useRef<HTMLInputElement | null>(null);
  const previousMonthInputRef = useRef<HTMLInputElement | null>(null);
  const gsaCurrentInputRef = useRef<HTMLInputElement | null>(null);
  const gsaPreviousInputRef = useRef<HTMLInputElement | null>(null);

  const [currentMonthFile, setCurrentMonthFile] = useState<File | null>(null);
  const [currentYearFile, setCurrentYearFile] = useState<File | null>(null);
  const [previousMonthFile, setPreviousMonthFile] = useState<File | null>(null);
  const [gsaCurrentFile, setGsaCurrentFile] = useState<File | null>(null);
  const [gsaPreviousFile, setGsaPreviousFile] = useState<File | null>(null);

  const monthLabel = useMemo(() => {
    if (currentMonthFile) {
      return extractMonthLabelFromName(currentMonthFile.name);
    }
    return extractMonthLabelFromName(filename);
  }, [currentMonthFile, filename]);

  return (
    <div className="space-y-3 rounded-xl border-2 border-dashboard-accent bg-dashboard-panelSoft p-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 rounded-xl border border-dashboard-accent bg-white px-3 py-2 text-sm font-medium text-dashboard-heading">
          <CalendarDays className="h-4 w-4" />
          <span>{monthLabel}</span>
          <span className="rounded-full bg-dashboard-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            5-file upload
          </span>
        </div>

        <Button
          onClick={() =>
            currentMonthFile &&
            onUpload(
              currentMonthFile,
              currentYearFile,
              previousMonthFile,
              gsaCurrentFile,
              gsaPreviousFile,
            )
          }
          disabled={!currentMonthFile}
        >
          <Upload className="mr-2 inline h-4 w-4" />
          Load
        </Button>

        <UploadStatus filename={filename} monthLabel={monthLabel} />
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        <UploadSlot
          label="1. Current Month Analysis"
          icon={<FileText className="h-4 w-4" />}
          file={currentMonthFile}
          onPick={() => currentMonthInputRef.current?.click()}
          required
        />

        <UploadSlot
          label="2. Current Year Workbook"
          icon={<History className="h-4 w-4" />}
          file={currentYearFile}
          onPick={() => currentYearInputRef.current?.click()}
        />

        <UploadSlot
          label="3. Previous Year Month Analysis"
          icon={<FolderClock className="h-4 w-4" />}
          file={previousMonthFile}
          onPick={() => previousMonthInputRef.current?.click()}
        />

        <UploadSlot
          label="4. GSA Current Year"
          icon={<TrendingUp className="h-4 w-4" />}
          file={gsaCurrentFile}
          onPick={() => gsaCurrentInputRef.current?.click()}
        />

        <UploadSlot
          label="5. GSA Previous Year"
          icon={<TrendingUp className="h-4 w-4" />}
          file={gsaPreviousFile}
          onPick={() => gsaPreviousInputRef.current?.click()}
        />
      </div>

      <input
        ref={currentMonthInputRef}
        type="file"
        accept=".xlsx,.xls,.xlsm"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          setCurrentMonthFile(file);
          e.currentTarget.value = "";
        }}
      />

      <input
        ref={currentYearInputRef}
        type="file"
        accept=".xlsx,.xls,.xlsm"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          setCurrentYearFile(file);
          e.currentTarget.value = "";
        }}
      />

      <input
        ref={previousMonthInputRef}
        type="file"
        accept=".xlsx,.xls,.xlsm"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          setPreviousMonthFile(file);
          e.currentTarget.value = "";
        }}
      />

      <input
        ref={gsaCurrentInputRef}
        type="file"
        accept=".xlsx,.xls,.xlsm"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          setGsaCurrentFile(file);
          e.currentTarget.value = "";
        }}
      />

      <input
        ref={gsaPreviousInputRef}
        type="file"
        accept=".xlsx,.xls,.xlsm"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          setGsaPreviousFile(file);
          e.currentTarget.value = "";
        }}
      />
    </div>
  );
}
