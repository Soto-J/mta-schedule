import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import StatusCard from "./status-card";

const fakeData = [
  { status: "Delays" },
  { status: "Planned Work" },
  { status: "No Scheduled Service" },
];

const SubwayTab = () => {
  return (
    <div>
      {fakeData.map((data) => (
        <StatusCard title={data.status} trainIcons={[]} />
      ))}
    </div>
  );
};

export default SubwayTab;
