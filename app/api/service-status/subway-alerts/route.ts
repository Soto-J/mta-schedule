import { NextResponse } from "next/server";
import axios from "axios";

import GtfsRealtimeBindings from "gtfs-realtime-bindings";

export async function GET() {
  try {
    const response = await axios.get(
      "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fsubway-alerts",
      {
        responseType: "arraybuffer",
        headers: {
          "x-api-key": process.env.MTA_API_KEY,
        },
      }
    );

    if (response.status !== 200) {
      return new NextResponse(`${response.statusText}`, {
        status: response.status,
      });
    }

    const decodedSubwayAlerts =
      GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
        new Uint8Array(response.data)
      );

    const subwayAlerts = decodedSubwayAlerts.entity.map(({ alert }) => ({
      informedEntity: {
        routeId: alert?.informedEntity?.at(0)?.routeId,
        stopId: alert?.informedEntity?.at(1)?.stopId,
      },
      activePeriod: alert?.activePeriod,
      descriptionText: alert?.headerText?.translation?.at(0)?.text,
    }));

    return NextResponse.json(subwayAlerts);
  } catch (error) {
    return new NextResponse(`Iternal Error`, { status: 500 });
  }
}
