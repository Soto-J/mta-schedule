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

const LONG_ISLAND_RAIL_ROAD = [
  {
    title: "Babylon Branch",
  },
  {
    title: "City Terminal Zone",
  },
  {
    title: "Far Rockaway Branch",
  },
  {
    title: "Hempstead Branch",
  },
  {
    title: "Long Beach Branch",
  },
  {
    title: "Montauk Branch",
  },
  {
    title: "Oyster Bay Branch",
  },
  {
    title: "Port Jefferson Branch",
  },
  {
    title: "Port Washington Branch",
  },
  {
    title: "Ronkonkoma Branch",
  },
  {
    title: "West Hempstead Branch",
  },
];

const LongIslandRailRoad = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Long Island RailRoad</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {LONG_ISLAND_RAIL_ROAD.map((railRoad, idx) => (
          <Dialog key={railRoad.title}>
            <DialogTrigger className="w-full text-start">
              {railRoad.title}
              {idx !== LONG_ISLAND_RAIL_ROAD.length - 1 && (
                <Separator className="mt-4" />
              )}
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>On or close.</DialogTitle>
                <DialogDescription>{railRoad.title}</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
      </CardContent>
    </Card>
  );
};

export default LongIslandRailRoad;
