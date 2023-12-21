import { NextResponse } from "next/server";
import axios from "axios";

import { getRailways } from "@/app/actions/get-railways";

import GtfsRealtimeBindings from "gtfs-realtime-bindings";

export async function GET(req: Request) {
  try {
    const longIslandFeed = await fetchData("long-island");
    const metroNorthFeed = await fetchData("metro-north");

    if (!longIslandFeed || !metroNorthFeed) {
      return NextResponse.error();
    }

    const railways = (await getRailways()) as any;

    if (!railways) {
      return new Error("Something went wrong readng railways csv");
    }

    // ***** Long Island *****
    // Planned Work
    const longIslandPlannedWork = longIslandFeed.reduce((obj, entity) => {
      entity.alert?.informedEntity?.forEach((ent) => {
        const { routeId } = ent;

        if (entity.id.includes("planned_work") && routeId) {
          if (!obj[routeId]) {
            obj[routeId] = [];
          }

          obj[routeId].push(entity.alert);
        }
      });

      return obj;
    }, {} as any);

    Object.entries(longIslandPlannedWork).forEach(([key, value]) => {
      const rail = railways.longIsland.find(
        (railway: any) => String(railway.route_id) === key,
      );

      if (!rail) return;

      rail.feeds.plannedWork.push(...(value as any[]));
    });

    // Alerts
    const longIslandAlerts = longIslandFeed.reduce((obj, entity) => {
      entity.alert?.informedEntity?.forEach((ent) => {
        const { routeId } = ent;

        if (entity.id.includes("alert") && routeId) {
          if (!obj[routeId]) {
            obj[routeId] = [];
          }

          obj[routeId].push(entity.alert);
        }
      });

      return obj;
    }, {} as any);

    Object.entries(longIslandAlerts).forEach(([key, value]) => {
      const rail = railways.longIsland.find(
        (railway: any) => String(railway.route_id) === key,
      );

      if (!rail) return;

      rail.feeds.alerts.push(...(value as any[]));
    });

    // ***** Metro North *****
    // Planned Work
    const metroNorthPlannedWork = metroNorthFeed.reduce((obj, entity) => {
      entity.alert?.informedEntity?.forEach((ent) => {
        const { routeId } = ent;

        if (entity.id.includes("planned_work") && routeId) {
          if (!obj[routeId]) {
            obj[routeId] = [];
          }

          obj[routeId].push(entity.alert);
        }
      });

      return obj;
    }, {} as any);

    Object.entries(metroNorthPlannedWork).forEach(([key, value]) => {
      const rail = railways.metroNorth.find(
        (railway: any) => String(railway.route_id) === key,
      );

      if (!rail) return;

      rail.feeds.plannedWork.push(...(value as any[]));
    });

    // Alerts
    const metroNorthAlerts = metroNorthFeed.reduce((obj, entity) => {
      entity.alert?.informedEntity?.forEach((ent) => {
        const { routeId } = ent;

        if (entity.id.includes("alert") && routeId) {
          if (!obj[routeId]) {
            obj[routeId] = [];
          }

          obj[routeId].push(entity.alert);
        }
      });

      return obj;
    }, {} as any);

    Object.entries(metroNorthAlerts).forEach(([key, value]) => {
      const rail = railways.metroNorth.find(
        (railway: any) => String(railway.route_id) === key,
      );

      if (!rail) return;

      rail.feeds.alerts.push(...(value as any[]));
    });

    return NextResponse.json({
      railways,
      // longIslandFeed: longIslandFeed,
      // metroNorthFeed: metroNorthFeed,
      // serviceStatusLI: {
      //   longIslandAlerts,
      //   longIslandPlannedWork,
      // },
    });
  } catch (error) {
    console.log({ error });
    return new NextResponse("Internal Error", { status: 500 });
  }
}

const fetchData = async (railType: "long-island" | "metro-north") => {
  try {
    const railwayURL = {
      "long-island": "camsys%2Flirr-alerts",
      "metro-north": "camsys%2Fmnr-alerts",
    };

    const response = await axios.get(
      `https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/${railwayURL[railType]}`,
      {
        responseType: "arraybuffer",
        headers: {
          "x-api-key": process.env.MTA_API_KEY,
        },
      },
    );

    if (response.status !== 200) {
      throw new Error(`Something went wrong fetching ${railType} data`);
    }

    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(response.data),
    );

    return feed.entity;
  } catch (error) {
    throw Error();
  }
};

/*
Long Island:
alert
https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Flirr-alerts

Metro North:
alert
https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fmnr-alerts
*/
