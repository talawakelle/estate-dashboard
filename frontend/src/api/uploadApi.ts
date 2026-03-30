import { client } from "./client";

export async function uploadWorkbook(
  currentMonthFile: File,
  currentYearFile?: File | null,
  previousMonthFile?: File | null,
  gsaCurrentFile?: File | null,
  gsaPreviousFile?: File | null
) {
  const form = new FormData();
  form.append("current_month_file", currentMonthFile);

  if (currentYearFile) {
    form.append("current_year_file", currentYearFile);
  }

  if (previousMonthFile) {
    form.append("previous_month_file", previousMonthFile);
  }

  if (gsaCurrentFile) {
    form.append("gsa_current_file", gsaCurrentFile);
  }

  if (gsaPreviousFile) {
    form.append("gsa_previous_file", gsaPreviousFile);
  }

  const { data } = await client.post("/upload", form, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  return data;
}