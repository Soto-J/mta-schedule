"use server";

import Papa from "papaparse";
import path from "path";
import fs from "fs/promises";

import axios, { AxiosRequestConfig } from "axios";

import GtfsRealtimeBindings from "gtfs-realtime-bindings";
import { GtfsAlert, GtfsEntity } from "./subway-helpers";

/*
  Long Island:
  alert
  https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Flirr-alerts

  Metro North:
  alert
  https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fmnr-alerts
*/

export const fetchRailwayData = async (
  railType: "long-island" | "metro-north",
) => {
  try {
    const railwayURL = {
      "long-island": "camsys%2Flirr-alerts",
      "metro-north": "camsys%2Fmnr-alerts",
    };

    const url = `https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/${railwayURL[railType]}`;
    const config: AxiosRequestConfig = {
      responseType: "arraybuffer",
      headers: {
        "x-api-key": process.env.MTA_API_KEY,
      },
    };

    const response = await axios.get(url, config);

    if (response.status !== 200) {
      throw new Error(`Something went wrong fetching ${railType} data.`);
    }

    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(response.data),
    );

    return feed.entity;
  } catch (error) {
    throw Error();
  }
};

export type Railway = {
  route_id: string;
  agency_id?: string;
  route_long_name: string;
  route_type: number;
  route_color: string;
  route_text_color: string;
  feeds: {
    alerts: GtfsAlert[];
    plannedWork: GtfsAlert[];
  };
};

export const railwayCSVData = async () => {
  try {
    const metroNorth = await readRailwayFile(
      `public/csv/long-island/routes.txt`,
    );

    const longIsland = await readRailwayFile(
      `public/csv/long-island/routes.txt`,
    );

    return {
      metroNorth,
      longIsland,
    };
  } catch (error) {
    throw error;
  }
};

const readRailwayFile = async (file: string) => {
  const filePath = path.join(process.cwd(), file);

  const fileContent = Papa.parse<Railway>(await fs.readFile(filePath, "utf8"), {
    header: true,
    dynamicTyping: true,
  });

  fileContent.data.pop(); // Remove last element, which is empty

  return fileContent.data;
};

// Filters
export const plannedWorkFilter = (
  feed: GtfsEntity[],
  railwaysData: {
    metroNorth: Railway[];
    longIsland: Railway[];
  },
) => {
  // Create hash and filter by planned work
  const filteredPlannedWork = feed.reduce(
    (obj: { [key: string]: GtfsAlert[] }, entity) => {
      entity.alert?.informedEntity?.forEach((ie) => {
        const { routeId } = ie;

        if (entity.id.includes("planned_work") && routeId) {
          if (!obj[routeId]) {
            obj[routeId] = [];
          }

          if (!entity.alert) return;

          obj[routeId].push(entity.alert);
        }
      });

      return obj;
    },
    {},
  );

  // Push planned_work into railwaycsv
  Object.entries(filteredPlannedWork).forEach(([routeId, plannedWorks]) => {
    const rail = railwaysData.longIsland.find(
      (railway: any) => String(railway.route_id) === routeId,
    );

    if (!rail) return;

    rail.feeds.plannedWork.push(...plannedWorks);
  });

  // Object.entries(filteredEntities).forEach(([routeId, alerts]) => {
  //   const rail = railwaysCSV.longIsland.find(
  //     (railway) => String(railway.route_id) === routeId,
  //   );

  //   if (!rail) return;

  //   rail.feeds.alerts.push(...alerts);
  // });

  return railwaysData;
};

export const alertFilter = (feeds: GtfsEntity[]) => {
  return feeds.reduce((obj: { [key: string]: GtfsAlert[] }, entity) => {
    entity.alert?.informedEntity?.forEach((ent) => {
      const { routeId } = ent;

      if (entity.id.includes("alert") && routeId) {
        if (!obj[routeId]) {
          obj[routeId] = [];
        }

        if (!entity.alert) return obj;

        obj[routeId].push(entity.alert);
      }
    });

    return obj;
  }, {});
};

export const addAlerts = (
  alertToAdd: { [key: string]: GtfsAlert[] },
  railwaysCSV: {
    metroNorth: Railway[];
    longIsland: Railway[];
  },
) => {
  Object.entries(alertToAdd).forEach(([key, alerts]) => {
    const rail = railwaysCSV.longIsland.find(
      (railway: any) => String(railway.route_id) === key,
    );

    if (!rail) return;

    rail.feeds.alerts.push(...alerts);
  });

  return;
};
