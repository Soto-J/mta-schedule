import { NextResponse } from "next/server";
import axios from "axios";
import GtfsRealtimeBindings from "gtfs-realtime-bindings";

export async function GET(req: Request) {
  try {
    const response = await axios.get(
      "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fsubway-alerts",
      {
        responseType: "arraybuffer",
        headers: {
          "x-api-key": process.env.MTA_API_KEY,
        },
      },
    );

    if (response.status !== 200) {
      return new NextResponse(`${response.statusText}`, {
        status: response.status,
      });
    }

    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(response.data),
    );

    if (!feed) {
      return new NextResponse(`No data`, { status: 404 });
    }

    // DELAY ALERTS
    const delayAlerts = feed.entity.filter((entity) =>
      entity.id.includes("alert"),
    );

    const delayedTrains = delayAlerts?.reduce((trains: any, data: any) => {
      data.alert.informedEntity.forEach((entity: any) => {
        if (entity.routeId) {
          trains?.add(entity.routeId);
        }
      });

      return trains;
    }, new Set());

    // PLANNED WORK ALERTS
    const plannedWorkAlerts = feed.entity.filter((entity) =>
      entity.id.includes("planned_work"),
    );
    const plannedWorkTrains = plannedWorkAlerts?.reduce(
      (trains: any, data: any) => {
        data.alert.informedEntity.forEach((entity: any) => {
          if (entity.routeId) {
            trains?.add(entity.routeId);
          }
        });

        return trains;
      },
      new Set(),
    );

    return NextResponse.json({
      delayFeed: {
        alert: delayAlerts,
        trains: Array.from(delayedTrains),
      },
      plannedWorkFeed: {
        alert: plannedWorkAlerts,
        trains: Array.from(plannedWorkTrains),
      },
    });
  } catch (error) {
    throw new NextResponse(`Iternal Error`, { status: 500 });
  }
}
