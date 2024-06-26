"use server";

import { revalidatePath } from "next/cache";

import { FilteredAlert, SubwayAlert, SubwayEntity } from "@/lib/subway-helpers";

import { subwayAlerts } from "@/lib/subway-service";

export type AlertResponse = {
  delayAlerts: FilteredAlert;
  plannedWorkAlerts: FilteredAlert;
  noActiveAlerts: FilteredAlert;
  noScheduledServices: FilteredAlert;
  test: SubwayAlert;
  entities: SubwayEntity;
};

export const getSubwayAlerts = async (): Promise<AlertResponse> => {
  try {
    const alerts = await subwayAlerts();

    if (!alerts) {
      throw new Error("Unable to fetch subway alerts.");
    }

    revalidatePath("/");

    return JSON.parse(JSON.stringify(alerts));
  } catch (error) {
    throw error;
  }
};
