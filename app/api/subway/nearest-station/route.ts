import axios from "axios";
import { NextResponse } from "next/server";

// **** Error occurred prerendering page "/api/subway/nearest-station" ****
export async function GET(req: Request) {
  try {
    // console.log(req.url);
    // const { searchParams } = new URL(req.url);
    // const latitude = searchParams.get("latitude");
    // const longitude = searchParams.get("longitude");

    // console.log({ latitude, longitude });
    // if (!latitude || !longitude) {
    //   return new NextResponse(`Bad Request`, { status: 400 });
    // }

    // const response = await axios.get(
    //   `https://dev.socrata.com/foundry/data.ny.gov/i9wp-a4ja`
    // );

    // if (response.status !== 200) {
    //   return new NextResponse(`${response.statusText}`, {
    //     status: response.status,
    //   });
    // }

    return NextResponse.json({ message: "Hello World" });
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
