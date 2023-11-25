import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BusFront, TrainFront, TrainTrack, TramFront } from "lucide-react";

const HomeTabs = () => {
  return (
    <div>
      <Tabs defaultValue="subway" className="">
        <TabsList className="space-x-4 px-4 py-10">
          <TabsTrigger value="subway" className="flex w-20 flex-col">
            <span>Subway</span>
            <TramFront />
          </TabsTrigger>
          <TabsTrigger value="bus" className="flex w-20 flex-col">
            <span>Bus</span>
            <BusFront />
          </TabsTrigger>
          <TabsTrigger value="rail" className="flex w-20 flex-col">
            <span>Rail</span>
            <TrainTrack />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default HomeTabs;
