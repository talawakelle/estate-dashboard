import { useEffect, useMemo, useRef } from "react";
import type { EstateListItem as EstateListItemType } from "../../types/estate";
import { EstateListItem } from "./EstateListItem";

type Props = {
  estates: EstateListItemType[];
  selectedEstateKey: string | null;
  onSelect: (estateKey: string | null) => void;
  query: string;
};

const LOW_GROWN_FAMILIES = ["deniyaya", "kganga", "moragalla", "indola"] as const;
const LOW_GROWN_VARIANTS = ["el", "bl", "combined"] as const;

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/[\s-]+/g, "_");
}

function getLowGrownFamily(value: string) {
  const name = normalize(value);

  if (name.includes("deniyaya")) return "deniyaya";
  if (name.includes("kganga")) return "kganga";
  if (name.includes("moragalla")) return "moragalla";
  if (name.includes("indola")) return "indola";

  return null;
}

function getLowGrownVariant(value: string) {
  const name = normalize(value);

  if (name.includes("combined")) return "combined";
  if (name.includes("cinnamon")) return "cinnamon";
  if (name.includes("fact_bl")) return "bl";
  if (name.includes("_bl")) return "bl";
  if (name.includes("_el")) return "el";

  return null;
}

function isLowGrownEstate(estate: EstateListItemType) {
  const variant = getLowGrownVariant(estate.key || estate.name);
  return variant !== "cinnamon" && getLowGrownFamily(estate.key || estate.name) !== null;
}

function buildLowGrownTable(estates: EstateListItemType[]) {
  const table = new Map<string, EstateListItemType>();

  for (const estate of estates) {
    const family = getLowGrownFamily(estate.key || estate.name);
    const variant = getLowGrownVariant(estate.key || estate.name);

    if (family && variant && variant !== "cinnamon") {
      table.set(`${family}:${variant}`, estate);
    }
  }

  const result: (EstateListItemType | null)[] = [];

  for (const variant of LOW_GROWN_VARIANTS) {
    for (const family of LOW_GROWN_FAMILIES) {
      const estate = table.get(`${family}:${variant}`) ?? null;
      result.push(estate);
    }
  }

  return result;
}

export function EstateList({ estates, selectedEstateKey, onSelect, query }: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const base = !normalizedQuery
      ? [...estates]
      : estates.filter((estate) =>
          normalize(estate.name).includes(normalize(normalizedQuery)) ||
          normalize(estate.key).includes(normalize(normalizedQuery))
        );

    return base;
  }, [query, estates]);

  const isLowGrownOnly =
    filtered.length > 0 && filtered.every((estate) => isLowGrownEstate(estate));

  const displayItems = useMemo(() => {
    if (isLowGrownOnly) {
      return buildLowGrownTable(filtered);
    }

    return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }, [filtered, isLowGrownOnly]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollTop = 0;

    let rafId = 0;
    let direction: 1 | -1 = 1;
    let lastTime = 0;
    let pauseUntil = 0;

    const topPause = 1200;
    const bottomPause = 2500;
    const pixelsPerSecond = 23;

    const animate = (time: number) => {
      const container = scrollRef.current;
      if (!container) return;

      const maxScroll = Math.max(0, container.scrollHeight - container.clientHeight);

      if (maxScroll <= 0) {
        rafId = window.requestAnimationFrame(animate);
        return;
      }

      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      if (time < pauseUntil) {
        rafId = window.requestAnimationFrame(animate);
        return;
      }

      const step = (pixelsPerSecond * delta) / 1000;
      container.scrollTop += step * direction;

      if (direction === 1 && container.scrollTop >= maxScroll) {
        container.scrollTop = maxScroll;
        direction = -1;
        pauseUntil = time + bottomPause;
      } else if (direction === -1 && container.scrollTop <= 0) {
        container.scrollTop = 0;
        direction = 1;
        pauseUntil = time + topPause;
      }

      rafId = window.requestAnimationFrame(animate);
    };

    const timer = window.setTimeout(() => {
      rafId = window.requestAnimationFrame(animate);
    }, 500);

    return () => {
      window.clearTimeout(timer);
      window.cancelAnimationFrame(rafId);
    };
  }, [displayItems]);

  return (
    <div
      ref={scrollRef}
      className="tv-scroll h-[calc(100vh-210px)] overflow-y-auto pr-1"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none"
      }}
    >
      {filtered.length === 0 ? (
        <div className="rounded-panel border border-dashboard-border bg-dashboard-panelMuted px-4 py-10 text-center">
          <div className="text-sm font-medium text-dashboard-heading">No estates found : Upload again with correct format </div>
          <div className="mt-1 text-sm text-dashboard-muted">
            Try a different search term.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {displayItems.map((estate, index) =>
            estate ? (
              <EstateListItem
                key={estate.key}
                estate={estate}
                active={selectedEstateKey === estate.key}
                onClick={() => onSelect(estate.key)}
              />
            ) : (
              <div key={`empty-${index}`} className="invisible" />
            )
          )}
        </div>
      )}

      <style>{`
        .tv-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}