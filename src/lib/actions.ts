"use server";

import { subMinutes } from "date-fns";
import { Alert, LiveStopTimeInstance, RouteWithShape, Stop } from "@/types";
import { getModel } from "@/lib/model";
import { stopCodeToStopId } from "@/lib/utils";

const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

let linesCache: { data: RouteWithShape[]; loadedAt: number } | null = null;
let stopsCache: { data: Record<string, Stop>; loadedAt: number } | null = null;

export async function predictionsByStopCode(
  stopCode: string
): Promise<LiveStopTimeInstance[]> {
  return getModel().getStopTimeInstances(
    stopCodeToStopId(stopCode),
    subMinutes(new Date(), 10),
    20
  );
}

export async function getServiceAlerts(): Promise<Alert[]> {
  return getModel().getAlerts();
}

export async function getLines(): Promise<RouteWithShape[]> {
  if (!linesCache || Date.now() - linesCache.loadedAt > TTL_MS) {
    linesCache = {
      data: await getModel().getRoutesWithShape(),
      loadedAt: Date.now(),
    };
  }
  return linesCache.data;
}

export async function getStops(): Promise<Record<string, Stop>> {
  if (!stopsCache || Date.now() - stopsCache.loadedAt > TTL_MS) {
    const stops = await getModel().getStops();
    const data: Record<string, Stop> = {};
    for (const stop of stops) data[stop.stopId] = stop;
    stopsCache = { data, loadedAt: Date.now() };
  }
  return stopsCache.data;
}

export async function getStop(stopCode: string): Promise<Stop | null> {
  return getModel().getStop(stopCodeToStopId(stopCode));
}
