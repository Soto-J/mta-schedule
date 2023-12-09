import StatusCard from "./status-card";

type SubwayTabProps = {
  subwayData: any;
};

const SubwayTab = ({ subwayData }: SubwayTabProps) => {
  subwayData && console.log(subwayData);

  return (
    <div className="flex justify-between">
      <div className="">
        <StatusCard title="Delays" alertFeeds={subwayData?.delayAlerts} />
        <StatusCard
          title="Planned Work"
          alertFeeds={subwayData?.plannedWorkAlerts}
        />
        <StatusCard title="No Scheduled Service" />
      </div>

      <div className="grow">
        <StatusCard title="No Active Alerts" />
      </div>
    </div>
  );
};

export default SubwayTab;
