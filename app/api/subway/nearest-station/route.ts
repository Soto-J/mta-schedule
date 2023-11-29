import { NextResponse } from "next/server";
import axios from "axios";

export const dynamic = "force-dynamic"; // defaults to force-static

// google api
const PLACES_URL =
  "https://maps.googleapis.com/maps/api/place/findplacefromtext/output?parameters";

const PLACES_NEARBY_URL =
  "https://places.googleapis.com/v1/places:searchNearby";
const SEARCH_URL = "https://places.googleapis.com/v1/places:searchNearby";

const HERE_URL = "https://transit.hereapi.com/v8/stations";
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");

    if (!latitude || !longitude) {
      return new NextResponse(`Bad Request`, { status: 400 });
    }

    const response = await axios.get(HERE_URL, {
      headers: {
        authorization: process.env.HERE_API_KEY,
      },
    });

    console.log(response);
    return NextResponse.json(response);
  } catch (error) {
    throw new NextResponse(`Iternal Error`, { status: 500 });
  }
}

/*
  Given a latitude and longitude, find the nearest subway station

  Documentation:
  https://dev.socrata.com/foundry/data.ny.gov/i9wp-a4ja
 
  api: 
  https://data.ny.gov/resource/i9wp-a4ja.json
*/

export async function POST(req: Request) {
  try {
    const { latitude, longitude } = await req.json();

    if (!latitude || !longitude) {
      return new NextResponse(`Bad Request`, { status: 400 });
    }

    const response = await axios.post(
      PLACES_NEARBY_URL,
      {
        includedTypes: ["restaurant"],
        maxResultCount: 10,
        locationRestriction: {
          circle: {
            center: {
              latitude,
              longitude,
            },
            radius: 500.0,
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_CLOUD_API_KEY,
          "X-Goog-FieldMask": "places.displayName",
        },
      },
    );

    console.log(response);
    return NextResponse.json(response);
  } catch (error) {
    throw new NextResponse(`Iternal Error`, { status: 500 });
  }
}
