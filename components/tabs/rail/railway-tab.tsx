import { useEffect, useState } from "react";

import { Railway } from "@/lib/railway-helpers";
import { onGetRailwayAlerts } from "@/actions/get-railways";

import { LongIslandRailRoad } from "./long-island-rail-road";
import { MetroNorthRailRoad } from "./metro-north-rail-road";

export const RailwayTab = () => {
  const [railData, setRailData] = useState<any>();

  useEffect(() => {
    alerts();
  }, []);

  const alerts = async () => {
    try {
      const response = await onGetRailwayAlerts();

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
