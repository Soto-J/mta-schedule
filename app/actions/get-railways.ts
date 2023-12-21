import Papa from "papaparse";
import path from "path";
import fs from "fs/promises";

export type Railway = {
  route_id: string;
  agency_id?: string;
  route_short_name?: string;
  route_long_name: string;
  route_desc?: string;
  route_type: number;
  route_url?: string;
  route_color: string;
  route_text_color: string;
  feeds: {
    alerts: any[];
    plannedWork: any[];
  };
};

export async function getRailways() {
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

    const longIsland = longIslandParsed.data.map((railway) => ({
      ...railway,
      feeds: {
        alerts: [],
        plannedWork: [],
      },
    }));

    const metroNorth = metroNothParsed.data.map((railway) => ({
      ...railway,
      feeds: {
        alerts: [],
        plannedWork: [],
      },
    }));

    return {
      longIsland,
      metroNorth,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}
