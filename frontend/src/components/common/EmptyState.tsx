type Props = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: Props) {
  return (
    <div className="rounded-panel border border-dashed border-dashboard-borderStrong bg-dashboard-panel p-12 text-center shadow-soft">
      <h3 className="text-xl font-semibold text-dashboard-heading">{title}</h3>
      <p className="mt-2 text-dashboard-muted">{description}</p>
    </div>
  );
}