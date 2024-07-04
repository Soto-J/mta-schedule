import { Railway } from "@/lib/railway-helpers";

import { RailwayContent } from "./railway-content";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

type RailwayListProps = {
  railways: Railway[];
  title: "Metro North" | "Long Island";
};

export const RailwayList = ({ railways, title }: RailwayListProps) => {
  // console.log(railways);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title} RailRoad</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {railways.map((railway, idx) => (
          <Dialog key={railway.route_id}>
            {/* Trigger */}
            <DialogTrigger className="w-full text-start">
              {railway.route_long_name}
              {idx !== railways.length - 1 && <Separator className="mt-4" />}
            </DialogTrigger>

            {/* Content */}
            <RailwayContent railway={railway} />
          </Dialog>
        ))}
      </CardContent>
    </Card>
  );
};
