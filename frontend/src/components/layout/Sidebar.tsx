import { Card } from "../common/Card";
import { EstateList } from "../sidebar/EstateList";
import { EstateStatusLegend } from "../sidebar/EstateStatusLegend";
import type { EstateListItem } from "../../types/estate";

type Props = {
  estates: EstateListItem[];
  selectedEstateKey: string | null;
  onSelect: (estateKey: string | null) => void;
};

export function Sidebar({ estates, selectedEstateKey, onSelect }: Props) {
  return (
    <aside className="h-full">
      <Card title="Estates" subtitle="Dataset order with business status colors" className="h-full">
        <div className="mb-4">
          <EstateStatusLegend />
        </div>
        <div className="h-[calc(100vh-280px)]">
          <EstateList estates={estates} selectedEstateKey={selectedEstateKey} onSelect={onSelect} query="" />
        </div>
      </Card>
    </aside>
  );
}