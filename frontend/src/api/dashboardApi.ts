import { client } from "./client";
import type { DashboardSummary, EstateDetail, EstateListItem, Mode } from "../types/dashboard";

export async function fetchSummary(mode: Mode): Promise<DashboardSummary> {
  const { data } = await client.get(`/dashboard/summary?mode=${mode}`);
  return data;
}

export async function fetchEstates(mode: Mode): Promise<EstateListItem[]> {
  const { data } = await client.get(`/dashboard/estates?mode=${mode}`);
  return data;
}

export async function fetchEstateDetail(mode: Mode, estateKey: string): Promise<EstateDetail> {
  const { data } = await client.get(`/dashboard/estate/${estateKey}?mode=${mode}`);
  return data;
}