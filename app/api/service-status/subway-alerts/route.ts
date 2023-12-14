import { NextResponse } from "next/server";
import axios from "axios";

import { subwayLines } from "@/app/(main)/service-status/_components/subway-lines";

import GtfsRealtimeBindings from "gtfs-realtime-bindings";

// TODO: Fix types
// type IAlert = GtfsRealtimeBindings.transit_realtime.IAlert;
// type Alert = {
//   [kay: string]: {
//     activePeriod: {
//       start: string;
//       end?: string;
//     }[];
//     headerText: {
//       translation: {
//         text: string;
//       }[];
//     }[];
//     informedEntity: {
//       routId?: string;
//       stopId?: string;
//     }[];
//   }[];
// };

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

    // Delay Alerts
    const delayAlerts = feed.entity.reduce((obj, entity) => {
      if (entity.id.includes("alert")) {
        const trainLine = entity.alert?.informedEntity?.[0].routeId;

        if (!trainLine) return;

        if (!obj[trainLine]) {
          obj[trainLine] = [];
        }

        obj[trainLine].push(entity.alert);
      }

      return obj;
    }, {} as any);

    // Planned Work Alerts - Window between now and 6 hours later
    const plannedWorkAlerts = feed.entity.reduce((obj, entity) => {
      // Six hour window
      const currentDate = new Date();
      const sixHoursLater = new Date(
        currentDate.getTime() + 6 * 60 * 60 * 1000,
      );
      // Planned work window
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

    // No Scheduled Services
    const noScheduledServices = feed.entity.reduce((obj, entity) => {
      const isNoService =
        entity.alert?.headerText?.translation?.[0].text.includes("No") &&
        entity.alert?.headerText?.translation?.[0].text.includes(
          "trains running",
        );

      if (isNoService) {
        const trainLine = entity.alert?.informedEntity?.[0].routeId;

        if (!trainLine) return obj;

        if (!obj[trainLine]) {
          obj[trainLine] = [];
        }

        obj[trainLine].push(entity.alert);
      }

      return obj;
    }, {} as any);

    const activeLines = [
      ...Object.keys(plannedWorkAlerts),
      ...Object.keys(delayAlerts),
      ...Object.keys(noScheduledServices),
    ];

    // No Active Alerts
    const noActiveAlerts = subwayLines.reduce((arr, line) => {
      const isNotActive = !activeLines.includes(line.value);

      if (isNotActive) {
        const alert = {
          descriptionText: {
            translation: [{ text: "No Active Alerts" }],
          },
          headerText: {
            translation: [{ text: "No Active Alerts" }],
          },
        };

        if (!arr[line.value]) {
          arr[line.value] = [];
        }

        arr[line.value].push(alert);
      }

      return arr;
    }, {} as any);

    // *******************TESTING
    const test = feed.entity.reduce((obj, entity) => {
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
        (sixHoursLater < plannedStart || currentDate > plannedEnd);

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

    return NextResponse.json({
      entities: feed.entity,
      test,
      delayAlerts,
      plannedWorkAlerts,
      noActiveAlerts,
      noScheduledServices,
    });
  } catch (error) {
    console.log({ error });
    throw new NextResponse(`Iternal Error`, { status: 500 });
  }
}
