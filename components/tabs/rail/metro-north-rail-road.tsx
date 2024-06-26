import { Railway } from "@/actions/get-railways";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

type MetroNorthRailRoadProps = {
  railways: Railway[];
};

const MetroNorthRailRoad = ({ railways }: MetroNorthRailRoadProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Metro North RailRoad</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {railways?.map((railway, idx) => (
          <Dialog key={railway.route_id}>
            <DialogTrigger className="w-full text-start">
              {railway.route_long_name}
              {idx !== railways.length - 1 && <Separator className="mt-4" />}
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>On or close.</DialogTitle>
                <DialogDescription>{railway.route_long_name}</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
      </CardContent>
    </Card>
  );
};

export default MetroNorthRailRoad;
