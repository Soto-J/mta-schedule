import HomeTabs from "@/components/tabs/home-tabs";
import { getRailway } from "./actions/get-railway";

export default async function Home() {
  const railwayLongIsland = await getRailway("long-island");
  const railwayMetroNorth = await getRailway("metro-north");

  return (
    <div className="">
      <HomeTabs
        railways={{
          railwayLongIsland,
          railwayMetroNorth,
        }}
      />
    </div>
  );
}
