import axios from "axios";
import { NextResponse } from "next/server";

import GtfsRealtimeBindings from "gtfs-realtime-bindings";

enum trainLines {
  BDFM = "bdfm",
  ACE = "ace",
  G = "g",
  JZ = "jz",
  NQRW = "nqrw",
  L = "l",
  SIR = "si",
  // 1-7
  NUMBER = "",
}

export async function GET(req: Request) {
  try {
    const response = await axios.get(
      `https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-${trainLines.BDFM}`,
      {
        responseType: "arraybuffer",
        headers: {
          "x-api-key": process.env.MTA_API_KEY,
        },
      }
    );

    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(response.data)
    );

    // feed.entity.forEach((entity) => {
    //   if (entity.tripUpdate) {
    //     console.log(entity.tripUpdate);
    //   }
    // });

    const updatedFeed = feed.entity.map((record) => {
      if (record.tripUpdate) {
        return record.tripUpdate;
      }
    });

    return NextResponse.json(updatedFeed);
  } catch (error) {
    throw new Error();
  }
}
