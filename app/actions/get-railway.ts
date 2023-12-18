import Papa from "papaparse";
import path from "path";
import fs from "fs/promises";

export type Railway = {
  route_id: string;
  agency_id: string;
  route_short_name?: string;
  route_long_name: string;
  route_desc: string;
  route_type: number;
  route_url: string;
  route_color: string;
  route_text_color: string;
};

export async function getRailway() {
  try {
    const metroNorthfilePath = path.join(
      process.cwd(),
      `public/csv/metro-north/routes.txt`,
    );

    const longIslandfilePath = path.join(
      process.cwd(),
      `public/csv/long-island/routes.txt`,
    );

    const metroNothParsed = Papa.parse<Railway>(
      await fs.readFile(metroNorthfilePath, "utf8"),
      {
        header: true,
        dynamicTyping: true,
      },
    );

    const longIslandParsed = Papa.parse<Railway>(
      await fs.readFile(longIslandfilePath, "utf8"),
      {
        header: true,
        dynamicTyping: true,
      },
    );

    // Remove last element of array, which is empty
    longIslandParsed.data.pop();
    metroNothParsed.data.pop();

    return {
      longIsland: longIslandParsed.data,
      metroNorth: metroNothParsed.data,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}
