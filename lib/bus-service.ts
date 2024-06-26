import axios from "axios";

import GtfsRealtimeBindings from "gtfs-realtime-bindings";

export const getBusAlerts = async () => {
  try {
    const response = await axios.get(
      "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fbus-alerts",
      {
        responseType: "arraybuffer",
        headers: {
          "x-api-key": process.env.MTA_API_KEY,
        },
      },
    );

    if (response.status !== 200) {
      throw new Error(`[Internal Error]: ${response.statusText}`);
    }

    const busAlerts = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(response.data),
    );

    return busAlerts;
  } catch (error) {
    throw error;
  }
};
