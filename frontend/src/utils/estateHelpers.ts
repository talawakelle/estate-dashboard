import type { EstateListItem } from "../types/estate";

export function sortByOrder(estates: EstateListItem[]) {
  return [...estates].sort((a, b) => a.order - b.order);
}