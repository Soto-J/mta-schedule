import { useEffect, useState } from "react";

import { LongIslandRailRoad } from "./long-island-rail-road";
import { MetroNorthRailRoad } from "./metro-north-rail-road";
import { Railway, getRailways } from "@/lib/railway-helpers";

export const RailwayTab = () => {
  const [railData, setRailData] = useState<{
    metroNorth: Railway[];
    longIsland: Railway[];
  }>();

  useEffect(() => {
    getRailAlerts();
  }, []);

  const getRailAlerts = async () => {
    try {
      const response = await getRailways();

      if (!response) {
        throw new Error("Something went wrong");
      }

      console.log({ response });
      setRailData(response);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="grid grid-cols-2">
      <LongIslandRailRoad railways={railData?.longIsland} />
      <MetroNorthRailRoad railways={railData?.metroNorth} />
    </div>
  );
};
