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

    const alerts = feed.entity.map((entity) => entity.alert);

    return NextResponse.json(feed);
  } catch (error) {
    throw new NextResponse(`Iternal Error`, { status: 500 });
  }
}
