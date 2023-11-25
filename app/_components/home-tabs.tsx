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

const HomeTabs = () => {
  return (
    <div>
      <Tabs defaultValue="subway" className="w-[400px]">
        <TabsList className="h-15 grid w-full grid-cols-3 content-center">
          <TabsTrigger value="subway" className="flex flex-col gap-1">
            <span>Subway</span>
            <TramFront />
          </TabsTrigger>
          <TabsTrigger value="bus" className="flex flex-col gap-1">
            <span>Bus</span>
            <BusFront />
          </TabsTrigger>
          <TabsTrigger value="rail" className="flex flex-col gap-1">
            <span>Rail</span>
            <TrainTrack />
          </TabsTrigger>

          <TabsContent value="subway">
            <Card></Card>
          </TabsContent>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default HomeTabs;
