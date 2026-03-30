import type { Status } from "../types/estate";

export function getStatusClasses(status: Status): string {
  switch (status) {
    case "red":
      return "border-red-200 bg-red-50 text-red-700";
    case "orange":
      return "border-amber-200 bg-amber-50 text-amber-700";
    default:
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }
}

export function getStatusDot(status: Status): string {
  switch (status) {
    case "red":
      return "bg-red-500";
    case "orange":
      return "bg-amber-500";
    default:
      return "bg-emerald-500";
  }
}