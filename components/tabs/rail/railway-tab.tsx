import { useEffect, useState } from "react";
import axios from "axios";

import LongIslandRailRoad from "./long-island-rail-road";
import MetroNorthRailRoad from "./metro-north-rail-road";

const RailsTab = () => {
  const [railData, setRailData] = useState<any>();

  useEffect(() => {
    getRailAlerts();
  }, []);

  const getRailAlerts = async () => {
    try {
      const response = await axios.get("/api/service-status/rail-alerts");

      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }

      console.log({ yurr: response.data });
      setRailData(response.data);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="grid grid-cols-2">
      <LongIslandRailRoad railways={railData?.railways.longIsland} />
      <MetroNorthRailRoad railways={railData?.railways.metroNorth} />
    </div>
  );
};

export default RailsTab;
