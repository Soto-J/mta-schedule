import { NextResponse } from "next/server";
import axios from "axios";

import GtfsRealtimeBindings from "gtfs-realtime-bindings";

export async function GET() {
  try {
    const response = await axios.get(
      "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fbus-alerts",
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

    const busAlerts = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(response.data)
    );

    return NextResponse.json(busAlerts);
  } catch (error) {
    return new NextResponse(`Iternal Error`, { status: 500 });
  }
}
