"use server";

import { revalidatePath } from "next/cache";

import { FilteredAlert, GtfsAlert, GtfsEntity } from "@/lib/subway-helpers";

import { getSubwayAlerts } from "@/lib/subway-service";

export type GetSubwayAlertsResponse = {
  delayAlerts: FilteredAlert;
  plannedWorkAlerts: FilteredAlert;
  noActiveAlerts: FilteredAlert;
  noScheduledServices: FilteredAlert;
  test: GtfsAlert;
  entities: GtfsEntity;
};

export const onGetSubwayAlerts = async (): Promise<GetSubwayAlertsResponse> => {
  try {
    const alerts = await getSubwayAlerts();

    if (!alerts) {
      throw new Error("Unable to fetch Subway Alerts.");
    }

    revalidatePath("/");

    return JSON.parse(JSON.stringify(alerts));
  } catch (error) {
    console.log(`[Internal Error]: onGetSubwayAlerts`);
    throw error;
  }
};
