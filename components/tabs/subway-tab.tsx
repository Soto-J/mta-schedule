import StatusCard from "./status-card";

type SubwayTabProps = {
  subwayData: any;
};

const SubwayTab = ({ subwayData }: SubwayTabProps) => {
  subwayData && console.log(subwayData);

  return (
    <div className="flex justify-between">
      <div className="flex-1">
        <StatusCard title="Delays" alertFeeds={subwayData?.delayAlerts} />
        <StatusCard
          title="Planned Work"
          alertFeeds={subwayData?.plannedWorkAlerts}
        />
        <StatusCard
          title="No Scheduled Service"
          alertFeeds={subwayData?.noScheduledServices}
        />
      </div>

      <div className="flex-1">
        <StatusCard
          title="No Active Alerts"
          alertFeeds={subwayData?.noActiveAlerts}
        />
      </div>
    </div>
  );
};

export default SubwayTab;
