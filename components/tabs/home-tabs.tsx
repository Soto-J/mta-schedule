"use client";

import { BusFront, TrainTrack, TramFront } from "lucide-react";

import SubwayTab from "./subway/subway-tab";
import BusTab from "./bus/bus-tab";
import RailsTab from "./rail/rails-tab";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HomeTabs = () => {
  return (
    <Tabs defaultValue="subway" className="mx-auto max-w-xl shadow-xl">
     <TabsList className="h-15 grid grid-cols-3">
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
      </TabsList>

      <div className="rounded bg-muted pb-0.5">
        <TabsContent value="subway">
          <SubwayTab  />
        </TabsContent>

        <TabsContent value="bus">
          <BusTab />
        </TabsContent>

        <TabsContent value="rail">
          <RailsTab />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default HomeTabs;
