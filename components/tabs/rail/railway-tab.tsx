import { type Railway } from "@/app/actions/get-railway";

import LongIslandRailRoad from "./long-island-rail-road";
import MetroNorthRailRoad from "./metro-north-rail-road";

type RailsTabProps = {
  railways: {
    railwayLongIsland: Railway[];
    railwayMetroNorth: Railway[];
  };
};

const RailsTab = ({ railways }: RailsTabProps) => {
  return (
    <div className="grid grid-cols-2">
      <LongIslandRailRoad railways={railways.railwayLongIsland} />
      <MetroNorthRailRoad railways={railways.railwayMetroNorth} />
    </div>
  );
};

export default RailsTab;
