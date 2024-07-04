"use server";

import { getRailwayAlerts } from "@/lib/railway-service";
import { revalidatePath } from "next/cache";
import { Railway } from "@/lib/railway-helpers";

export type GetRailwayResponse = {
  metroNorth: Railway[];
  longIsland: Railway[];
};

export const onGetRailwayAlerts = async (): Promise<GetRailwayResponse> => {
  try {
    const alerts = await getRailwayAlerts();

    if (!alerts) {
      throw new Error("Unable to fetch Railway Alerts.");
    }

    revalidatePath("/");

    return JSON.parse(JSON.stringify(alerts));
  } catch (error) {
    console.log(`[Interal Error]: onGetRailwayResponse`);
    throw error;
  }
};
