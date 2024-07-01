"use server";

import { getRailwayAlerts } from "@/lib/railway-service";
import { revalidatePath } from "next/cache";

export const onGetRailwayAlerts = async () => {
  try {
    const alerts = await getRailwayAlerts();
    
    if (!alerts) {
      throw new Error("Unable to fetch Railway Alerts.");
    }

    // revalidatePath("/");

    return JSON.parse(JSON.stringify(alerts));
  } catch (error) {
    console.log(`[Interal Error]`);
  }
};
