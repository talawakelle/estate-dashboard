import { AxiosError } from "axios";
import { uploadWorkbook } from "../api/uploadApi";
import { useDashboardStore } from "../store/dashboardStore";

function getErrorMessage(error: unknown) {
  if (error instanceof AxiosError) {
    return error.response?.data?.detail ?? error.message ?? "Upload failed.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Upload failed.";
}

export function useUploadWorkbook(onUploaded: () => Promise<void>) {
  const setLoading = useDashboardStore((s) => s.setLoading);
  const setError = useDashboardStore((s) => s.setError);
  const setFilename = useDashboardStore((s) => s.setFilename);

  async function upload(
    currentMonthFile: File,
    currentYearFile?: File | null,
    previousMonthFile?: File | null,
    gsaCurrentFile?: File | null,
    gsaPreviousFile?: File | null,
  ) {
    try {
      setLoading(true);
      setError(null);
      const result = await uploadWorkbook(
        currentMonthFile,
        currentYearFile,
        previousMonthFile,
        gsaCurrentFile,
        gsaPreviousFile,
      );
      setFilename(result.filename ?? currentMonthFile.name);
      await onUploaded();
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return { upload };
}
