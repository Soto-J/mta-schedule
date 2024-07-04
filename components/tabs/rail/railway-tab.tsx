import { useEffect, useState } from "react";

import { GetRailwayResponse, onGetRailwayAlerts } from "@/actions/get-railways";

import { RailwayList } from "./railway-list";

export const RailwayTab = () => {
  const [railData, setRailData] = useState<GetRailwayResponse>();

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

  console.log({ railData });
  return (
    <div className="grid grid-cols-2">
      <RailwayList railways={railData?.longIsland || []} title="Long Island" />
      <RailwayList railways={railData?.metroNorth || []} title="Metro North" />
    </div>
  );
};
