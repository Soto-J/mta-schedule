import SubwayStatusCard from "./subway-status-card";

type SubwayTabProps = {
  subwayData: any;
};

const SubwayTab = ({ subwayData }: SubwayTabProps) => {
  subwayData && console.log(subwayData);

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
