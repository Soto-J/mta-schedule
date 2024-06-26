"use client";

import { useEffect, useState } from "react";

import SubwayStatusCard from "./subway-status-card";
import { AlertResponse, getSubwayAlerts } from "@/actions/subway-alerts";

const SubwayTab = () => {
  const [subwayData, setSubwayData] = useState<AlertResponse>();

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => fetchData(), 5000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchData = async () => {
    try {
      const subwayAlerts = await getSubwayAlerts();

      if (!subwayAlerts) {
        throw new Error("Something went wrong");
      }

      console.log({ subwayAlerts });

      setSubwayData(subwayAlerts);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="flex justify-between">
      <div className="flex-1">
        {/* Delays */}
        <SubwayStatusCard title="Delays" alertFeeds={subwayData?.delayAlerts} />

        {/* Planned Work */}
        <SubwayStatusCard
          title="Planned Work"
          alertFeeds={subwayData?.plannedWorkAlerts}
        />

        {/* No Scheduled Service */}
        <SubwayStatusCard
          title="No Scheduled Service"
          alertFeeds={subwayData?.noScheduledServices}
        />
      </div>

      <div className="flex-1">
        <SubwayStatusCard
          title="No Active Alerts"
          alertFeeds={subwayData?.noActiveAlerts}
        />
      </div>
    </div>
  );
};

export default SubwayTab;
