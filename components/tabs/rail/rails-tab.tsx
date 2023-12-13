import LongIslandRailRoad from "./long-island-rail-road";
import MetroNorthRailRoad from "./metro-north-rail-road";

const RailsTab = () => {
  return (
    <div className="grid grid-cols-2">
      <LongIslandRailRoad />
      <MetroNorthRailRoad />
    </div>
  );
};

export default RailsTab;
