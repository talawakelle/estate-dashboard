export function formatNumber(value: number): string {
  const num = Number(value ?? 0);

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(num);
}

export function formatCompact(value: number): string {
  const num = Number(value ?? 0);
  const millions = num / 1_000_000;
  const absMillions = Math.abs(millions);

  if (absMillions >= 1) {
    return `${new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    }).format(millions)}M`;
  }

  return `${millions.toFixed(3)}M`;
}