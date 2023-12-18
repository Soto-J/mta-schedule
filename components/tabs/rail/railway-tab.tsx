import { type Railway } from "@/app/actions/get-railway";

import LongIslandRailRoad from "./long-island-rail-road";
import MetroNorthRailRoad from "./metro-north-rail-road";

type RailsTabProps = {
  railways: {
    longIsland: Railway[];
    metroNorth: Railway[];
  };
};

const RailsTab = ({ railways }: RailsTabProps) => {
  return (
    <div className="grid grid-cols-2">
      <LongIslandRailRoad railways={railways.longIsland} />
      <MetroNorthRailRoad railways={railways.metroNorth} />
    </div>
  );
};

export default RailsTab;
