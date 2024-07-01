import {
  delayedAlertsFilter,
  fetchSubwayData,
  noActiveAlertsFilter,
  noScheduledServicesFilter,
  plannedWorkAlertsFilter,
  plannedWorkFilterTest,
} from "./subway-helpers";

export const getSubwayAlerts = async () => {
  try {
    const feed = await fetchSubwayData();

    if (!feed) {
      throw new Error(`[Eternal 404]: ${feed}`);
    }

    // Filters
    const delayAlerts = delayedAlertsFilter(feed.entity);
    // Window between now and 6 hours later
    const plannedWorkAlerts = plannedWorkAlertsFilter(feed.entity);
    const noScheduledServices = noScheduledServicesFilter(feed.entity);
    const noActiveAlerts = noActiveAlertsFilter(
      delayAlerts,
      plannedWorkAlerts,
      noScheduledServices,
    );

    const test = plannedWorkFilterTest(feed.entity);

    return {
      delayAlerts,
      plannedWorkAlerts,
      noActiveAlerts,
      noScheduledServices,
      test,
      entities: feed.entity,
    };
  } catch (error) {
    console.log({ error });
    throw new Error(`[Iternal Error 500]`);
  }
};

export const dynamic = "force-dynamic"; // defaults to force-static

// google api
// const PLACES_URL =
//   "https://maps.googleapis.com/maps/api/place/findplacefromtext/output?parameters";
// const PLACES_NEARBY_URL =
//   "https://places.googleapis.com/v1/places:searchNearby";
// const SEARCH_URL = "https://places.googleapis.com/v1/places:searchNearby";
// const HERE_URL = "https://transit.hereapi.com/v8/stations";

// export const getCurrentLocation = async (req: Request) => {
//   try {
//     const { searchParams } = new URL(req.url);

//     const latitude = searchParams.get("latitude");
//     const longitude = searchParams.get("longitude");

//     if (!latitude || !longitude) {
//       throw new Error(`[Internal Error]: Bad Request 404`);
//     }

//     const response = await axios.get(HERE_URL, {
//       headers: {
//         authorization: process.env.HERE_API_KEY,
//       },
//     });

//     console.log(response);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

/*
  Given a latitude and longitude, find the nearest subway station

  Documentation:
  https://dev.socrata.com/foundry/data.ny.gov/i9wp-a4ja
 
  api: 
  https://data.ny.gov/resource/i9wp-a4ja.json
*/

// export const nearestStation = async (req: Request) => {
//   try {
//     const { latitude, longitude } = await req.json();

//     if (!latitude || !longitude) {
//       throw new Error(`Bad Request 404`);
//     }

//     const response = await axios.post(
//       PLACES_NEARBY_URL,
//       {
//         includedTypes: ["restaurant"],
//         maxResultCount: 10,
//         locationRestriction: {
//           circle: {
//             center: {
//               latitude,
//               longitude,
//             },
//             radius: 500.0,
//           },
//         },
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "X-Goog-Api-Key": process.env.GOOGLE_CLOUD_API_KEY,
//           "X-Goog-FieldMask": "places.displayName",
//         },
//       },
//     );

//     console.log(response);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// enum TrainLines {
//   BDFM = "bdfm",
//   ACE = "ace",
//   G = "g",
//   JZ = "jz",
//   NQRW = "nqrw",
//   L = "l",
//   SIR = "si",
//   NUMBER = "", // For numbered lines (1-7)
// }

// export const subwayAlerts = async () => {
//   try {
//     const url = `https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-${TrainLines.BDFM}`;

//     const config = {
//       responseType: "arraybuffer" as const,
//       headers: {
//         "x-api-key": process.env.MTA_API_KEY,
//       },
//     };

//     const response = await axios.get(url, config);

//     if (response.status !== 200) {
//       throw new Error("Failed to fetch GTFS data.");
//     }

//     const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
//       new Uint8Array(response.data),
//     );

//     const updatedFeed = feed.entity.filter((record) => record.tripUpdate);
//     console.log(feed.entity);
//     console.log(updatedFeed);

//     return updatedFeed;
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(`[Iternal Error] subwayAlerts: ${error.message}`);
//     }
//   }
// };
