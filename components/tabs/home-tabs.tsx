import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BusFront, TrainFront, TrainTrack, TramFront } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SubwayTab from "./subway-tab";
import BusTab from "./bus-tab";
import RailsTab from "./rails-tab";

const HomeTabs = () => {
  return (
    <Tabs defaultValue="subway" className="mx-auto max-w-xl">
      <TabsList className="h-15 grid w-full grid-cols-3">
        <TabsTrigger value="subway" className="flex flex-col gap-1 pb-2">
          <span>Subway</span>
          <TramFront />
        </TabsTrigger>
        <TabsTrigger value="bus" className="flex flex-col gap-1 pb-2">
          <span>Bus</span>
          <BusFront />
        </TabsTrigger>
        <TabsTrigger value="rail" className="flex flex-col gap-1 pb-2">
          <span>Rail</span>
          <TrainTrack />
        </TabsTrigger>

        <TabsContent value="subway">
          <SubwayTab />
        </TabsContent>

        <TabsContent value="bus">
          <BusTab />
        </TabsContent>

        <TabsContent value="rail">
          <RailsTab />
        </TabsContent>
      </TabsList>
    </Tabs>
  );
};

export default HomeTabs;
