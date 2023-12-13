import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import BusSelector from "./bus-selector";

const BusTab = () => {
  return (
    <Card className="min-h-64">
      <CardHeader>
        <CardTitle>Find and Track Buses</CardTitle>
      </CardHeader>

      <div className="flex h-full items-center justify-center">
        <BusSelector />
      </div>
    </Card>
  );
};

export default BusTab;
