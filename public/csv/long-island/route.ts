import { NextResponse } from "next/server";
import Papa from "papaparse";
import path from "path";

export async function GET() {
  try {
    // const pathLIRR = path.join(process.cwd(), "./LIRR-railway/routes.txt");
    // const dataLIRR = Papa.parse(pathLIRR);
    //   const dataMN = Papa.parse("./MN-railway/routes.txt");

    return NextResponse.json({ Hello: "World" });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
