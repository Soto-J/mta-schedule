import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import BusSelector from "./bus-selector";
import { Button } from "@/components/ui/button";

const BusTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-lg">
          Find and Track Buses
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">
        <BusSelector />
        <Button className="max-w-fit">Search</Button>
      </CardContent>
    </Card>
  );
};

export default BusTab;
