import { GtfsAlert } from "@/lib/subway-helpers";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type SubwayAlertContentProps = {
  alerts: GtfsAlert[];
};

export const SubwayAlertContent = ({ alerts }: SubwayAlertContentProps) => {
  return (
    <>
      {alerts.map((alert, i) => {
        const description = alert.descriptionText?.translation?.[0]?.text;
        const header = alert.headerText?.translation?.[0]?.text;

        return (
          <div key={i}>
            <DialogHeader>
              <DialogTitle className="text-start leading-6">
                {header}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="my-4 leading-6">
              {description}
            </DialogDescription>
          </div>
        );
      })}
    </>
  );
};
