import type { PropsWithChildren } from "react";
import { Card } from "../common/Card";

type Props = PropsWithChildren<{
  title: string;
  subtitle?: string;
}>;

export function ChartCard({ title, subtitle, children }: Props) {
  return (
    <Card title={title} subtitle={subtitle} className="h-full">
      <div className="h-[320px]">{children}</div>
    </Card>
  );
}