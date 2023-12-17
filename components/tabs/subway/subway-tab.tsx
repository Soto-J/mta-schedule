"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import SubwayStatusCard from "./subway-status-card";

const SubwayTab = () => {
  const [subwayData, setSubwayData] = useState<any>();

  useEffect(() => {
    getSubwayAlerts();

    setInterval(() => {
      getSubwayAlerts();
    }, 5000);
  }, []);

  const getSubwayAlerts = async () => {
    try {
      const response = await axios.get("/api/service-status/subway-alerts");

      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }

      setSubwayData(response.data);
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

export default SubwayTab;
