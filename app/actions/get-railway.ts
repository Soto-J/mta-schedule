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

export async function getRailway(railway: string) {
  try {
    const filePath = path.join(
      process.cwd(),
      `public/csv/${railway}/routes.txt`,
    );

    const fileContents = await fs.readFile(filePath, "utf8");

    const parsedData = Papa.parse<Railway>(fileContents, {
      header: true,
      dynamicTyping: true,
    });

    // Remove last element of array, which is empty
    parsedData.data.pop();

    return parsedData.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
