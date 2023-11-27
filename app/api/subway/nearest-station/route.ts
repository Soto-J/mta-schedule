import { NextResponse } from "next/server";
import axios from "axios";

export const dynamic = "force-dynamic"; // defaults to force-static

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");

    if (!latitude || !longitude) {
      return new NextResponse(`Bad Request`, { status: 400 });
    }

    const latitudeRadians = Number(latitude) * (Math.PI / 180);
    const longitudeRadians = Number(longitude) * (Math.PI / 180);

    const response = await axios.get(
      `https://dev.socrata.com/foundry/data.ny.gov/i9wp-a4ja`,
    );

    console.log(response)
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
