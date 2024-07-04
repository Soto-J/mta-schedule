import { FilteredAlert } from "@/lib/subway-helpers";

import { SubwayLine } from "./subway-line";

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

type StatusCardProps = {
  title?: string;
  alertFeeds?: FilteredAlert;
};

export const SubwayStatusCard = ({ title, alertFeeds }: StatusCardProps) => {
  const excludeSubwayLines = ["GS", "6X", "SI", "7X", "FS"];

  return (
    <Card className={title === `No Active Alerts` ? "h-full" : ""}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-4 gap-2">
          {alertFeeds &&
            Object.entries(alertFeeds)?.map(([subwayLine, alerts]) => {
              if (excludeSubwayLines.includes(subwayLine)) return null;

              return (
                <SubwayLine
                  key={subwayLine}
                  line={subwayLine}
                  alerts={alerts}
                />
              );
            })}
        </div>
      </CardContent>
    </Card>
  );
};
