import { Upload } from "lucide-react";

type Props = {
  label?: string;
  title?: string;
  onFileSelect: (file: File) => void;
};

export function FileDropzone({ label = "", title, onFileSelect }: Props) {
  return (
    <label
      title={title}
      className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-dashed border-dashboard-borderStrong bg-dashboard-panelSoft text-dashboard-text transition-colors hover:bg-dashboard-panelMuted"
    >
      <Upload className="h-4 w-4" />
      <input
        type="file"
        accept=".xlsx,.xls,.xlsm"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelect(file);
        }}
      />
      {label ? <span className="ml-2">{label}</span> : null}
    </label>
  );
}