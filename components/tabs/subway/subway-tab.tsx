"use client";

import { useEffect, useState } from "react";

import {
  GetSubwayAlertsResponse,
  onGetSubwayAlerts,
} from "@/actions/subway-alerts";

import { SubwayStatusCard } from "./subway-status-card";

export const SubwayTab = () => {
  const [subwayData, setSubwayData] = useState<GetSubwayAlertsResponse>();

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => fetchData(), 5000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchData = async () => {
    try {
      const subwayAlerts = await onGetSubwayAlerts();

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
        <SubwayStatusCard title="Delays" alertFeeds={subwayData?.delayAlerts} />

        <SubwayStatusCard
          title="Planned Work"
          alertFeeds={subwayData?.plannedWorkAlerts}
        />

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
