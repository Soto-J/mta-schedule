import { Railway } from "@/lib/railway-helpers";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type RailwayContent = {
  railway: Railway;
};

export const RailwayContent = ({ railway }: RailwayContent) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>On or close.</DialogTitle>
        <DialogDescription>{railway.route_long_name}</DialogDescription>
      </DialogHeader>

      <div className="flex flex-col space-y-2">
        {railway.feeds?.alerts?.map((alert, i) => (
          <div key={i}>
            <DialogTitle className="leading-6">
              {alert.headerText?.translation?.[0].text}
            </DialogTitle>
            <DialogDescription className="mt-2 leading-6">
              {alert.descriptionText?.translation?.[0].text}
            </DialogDescription>
          </div>
        ))}
      </div>

      <div className="flex flex-col space-y-2">
        {railway?.feeds?.plannedWork?.map((plannedWork, i) => (
          <div key={i}>
            <DialogTitle className="leading-6">
              {plannedWork.headerText?.translation?.[0].text}
            </DialogTitle>
            <DialogDescription className="mt-2 leading-6">
              {plannedWork.descriptionText?.translation?.[0].text}
            </DialogDescription>
          </div>
        ))}
      </div>
    </DialogContent>
  );
};
