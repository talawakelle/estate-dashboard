import type { ReactNode } from "react";

type Props = {
  header: ReactNode;
  sidebar?: ReactNode | null;
  estatesSection?: ReactNode | null;
  children: ReactNode;
};

export function DashboardLayout({
  header,
  sidebar,
  estatesSection,
  children
}: Props) {
  return (
    <div className="bg-dashboard-bg">
      <div className="mx-auto flex max-w-[1920px] flex-col gap-3 px-3 py-3">
        {header}
        {sidebar}
        {estatesSection}
        {children}
      </div>
    </div>
  );
}