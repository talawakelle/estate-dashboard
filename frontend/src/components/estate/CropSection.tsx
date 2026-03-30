import type { CropSection as CropSectionType } from "../../types/estate";
import { ChartCard } from "../charts/ChartCard";
import { BudgetActualBarChart } from "../charts/BudgetActualBarChart";

type Props = {
  crop: CropSectionType;
};

export function CropSection({ crop }: Props) {
  return (
    <ChartCard title={crop.crop_name} subtitle="Budget vs Actual by KPI">
      <BudgetActualBarChart items={crop.kpis} />
    </ChartCard>
  );
}