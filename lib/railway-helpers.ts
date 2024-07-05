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
  feeds?: {
    alerts?: GtfsAlert[];
    plannedWork?: GtfsAlert[];
  };
};

export const getRailwayRoutes = async () => {
  try {
    const metroNorth = await readRailwayFile(`/lib/csv/metro-north/routes.txt`);
    const longIsland = await readRailwayFile(`/lib/csv/long-island/routes.txt`);

    return { metroNorth, longIsland };
  } catch (error) {
    throw error;
  }
};

const readRailwayFile = async (file: string) => {
  const filePath = path.join(process.cwd(), file); // Deployed filePath is giving me /var/task/lib/csv/metro-north/routes.txt
  try {
    console.log(`PATH: ${filePath}`);

    const fileContent = await fs.readFile(filePath, "utf8");

    const parsedContent = Papa.parse<Railway>(fileContent, {
      header: true,
      dynamicTyping: true,
    });

    parsedContent.data.pop(); // Remove last element, which is empty

    return parsedContent.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `ATTEMPTED TO GET FILE PATH: ${filePath}. [Error]: ${error}`,
      );
    }
    throw error;
  }
};

export const addPlannedWork = (
  feed: GtfsEntity[],
  railType: "metroNorth" | "longIsland",
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
    const rail = railwaysData[`${railType}`].find(
      (railway) => String(railway.route_id) === routeId,
    );

    if (!rail) return;

    if (!rail.feeds) {
      rail.feeds = { plannedWork: [] };
    }

    if (!rail.feeds.plannedWork) {
      rail.feeds.plannedWork = [];
    }

    rail.feeds.plannedWork.push(...plannedWorks);
  });
};

export const addAlerts = (
  feeds: GtfsEntity[],
  railType: "metroNorth" | "longIsland",
  railwaysData: {
    metroNorth: Railway[];
    longIsland: Railway[];
  },
) => {
  // Create hash and filter by alerts
  const filteredAlerts = feeds.reduce(
    (obj: { [key: string]: GtfsAlert[] }, entity) => {
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
    },
    {},
  );

  Object.entries(filteredAlerts).forEach(([routeId, alerts]) => {
    const rail = railwaysData[`${railType}`].find(
      (railway) => String(railway.route_id) === routeId,
    );

    if (!rail) return;

    if (!rail.feeds) {
      rail.feeds = {};
    }

    if (!rail.feeds.alerts) {
      rail.feeds.alerts = [];
    }

    rail.feeds.alerts.push(...alerts);
  });
};

// const processFeed = (
//   feed: GtfsEntity[],
//   railwaysData: {
//     metroNorth: Railway[];
//     longIsland: Railway[];
//   },
//   feedType: "plannedWork" | "alerts",
// ) => {
//   const filteredFeed = feed.reduce(
//     (acc: { [key: string]: GtfsAlert[] }, entity) => {
//       if (!entity.alert) return acc;

//       entity.alert.informedEntity?.forEach(({ routeId }) => {
//         if (routeId && entity.id.includes(feedType)) {
//           if (!acc[routeId]) acc[routeId] = [];

//           if (!entity.alert) return acc;

//           acc[routeId].push(entity.alert);
//         }
//       });

//       return acc;
//     },
//     {},
//   );

//   Object.entries(filteredFeed).forEach(([routeId, alerts]) => {
//     const railway = railwaysData.find(
//       (railway) => String(railway.route_id) === routeId,
//     );
//     if (railway) {
//       railway.feeds[feedType].push(...alerts);
//     }
//   });
// };

// export const addPW = (
//   feed: GtfsEntity[],
//   railwaysData: {
//     metroNorth: Railway[];
//     longIsland: Railway[];
//   },
// ) => processFeed(feed, railwaysData, "plannedWork");

// export const addA = (
//   feed: GtfsEntity[],
//   railwaysData: {
//     metroNorth: Railway[];
//     longIsland: Railway[];
//   },
// ) => processFeed(feed, railwaysData, "alerts");
