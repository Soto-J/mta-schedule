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
    const delayAlerts = feed.entity.reduce((obj, entity) => {
      if (entity.id.includes("alert")) {
        const trainLine = entity.alert?.informedEntity?.[0].routeId;

        if (!trainLine) return;

        // obj = obj[trainLine].push(entity.alert) || [entity.alert];

        if (!obj[trainLine]) {
          obj[trainLine] = [];
        }

        obj[trainLine].push(entity.alert);
      }

      return obj;
    }, {} as any);

    // PLANNED WORK ALERTS - Window between now and 6 hours later
    const plannedWorkAlerts = feed.entity.reduce((obj, entity) => {
      // Six hour window
      const currentDate = new Date();
      const sixHoursLater = new Date(
        currentDate.getTime() + 6 * 60 * 60 * 1000,
      );
      // planned work window
      const plannedStart = new Date(
        entity.alert?.activePeriod?.[0].start * 1000,
      );
      const plannedEnd = new Date(entity.alert?.activePeriod?.[0].end * 1000);

      const isWithinWindow =
        entity.id.includes("planned_work") &&
        ((currentDate >= plannedStart && sixHoursLater <= plannedEnd) ||
          (currentDate <= plannedStart && sixHoursLater >= plannedStart) ||
          (currentDate >= plannedStart && currentDate <= plannedEnd) ||
          (currentDate <= plannedStart && sixHoursLater >= plannedEnd));

      if (isWithinWindow) {
        const trainLine = entity.alert?.informedEntity?.[0].routeId;

        if (!trainLine) return;

        if (!obj[trainLine]) {
          obj[trainLine] = [];
        }

        obj[trainLine].push(entity.alert);
      }

      return obj;
    }, {} as any);

    // TODO-1: Look for "no scheduled services" trains lines in feed

    // TODO-2: Find no active alerts
    // const noServiceAlerts = plannedWorkAlerts
    return NextResponse.json({
      delayAlerts,
      plannedWorkAlerts,
      feed,
    });
  } catch (error) {
    throw new NextResponse(`Iternal Error`, { status: 500 });
  }
}
