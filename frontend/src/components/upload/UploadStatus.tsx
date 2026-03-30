type Props = {
  filename: string | null;
  monthLabel?: string;
};

export function UploadStatus({ filename, monthLabel }: Props) {
  if (!filename) return null;

  return (
    <div className="text-sm text-dashboard-muted">
      {monthLabel ? `Loaded: ${monthLabel} · Separate files ready` : "Loaded"}
    </div>
  );
}