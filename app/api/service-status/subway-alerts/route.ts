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

    console.log(feed);

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

    // PLANNED WORK ALERTS - Window between now and 6 hours later
    const plannedWorkAlerts = feed.entity.filter((entity) => {
      // Current time window
      const currentDate = new Date();
      const sixHoursLater = new Date(
        currentDate.getTime() + 6 * 60 * 60 * 1000,
      );
      // planned work window
      const plannedStart = new Date(
        entity.alert?.activePeriod?.[0].start * 1000,
      );
      const plannedEnd = new Date(entity.alert?.activePeriod?.[0].end * 1000);

      // return (
      //   entity.id.includes("planned_work") &&
      //   ((currentDate <= plannedStart && sixHoursLater >= plannedStart) ||
      //     (currentDate >= plannedStart && currentDate <= plannedEnd))
      // );

      return (
        entity.id.includes("planned_work") &&
        ((currentDate >= plannedStart && sixHoursLater <= plannedEnd) ||
          (currentDate <= plannedStart && sixHoursLater >= plannedStart) ||
          (currentDate >= plannedStart && currentDate <= plannedEnd) ||
          (currentDate <= plannedStart && sixHoursLater >= plannedEnd))
      );
    });

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
        alerts: delayAlerts,
        trains: Array.from(delayedTrains),
      },
      plannedWorkFeed: {
        alerts: plannedWorkAlerts,
        trains: Array.from(plannedWorkTrains),
      },
      feed,
    });
  } catch (error) {
    throw new NextResponse(`Iternal Error`, { status: 500 });
  }
}
