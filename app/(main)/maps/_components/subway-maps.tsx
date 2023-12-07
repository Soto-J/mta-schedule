import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const MAPS = [
  {
    mapImg: "/images/maps/subway/subway-map-day.svg",
    title: "Subway Map",
    discription:
      "The New York subway map with acccessible stations highlighted. This map shows typical weekday service.",
  },
  {
    mapImg: "/images/maps/subway/subway-map-night.svg",
    alt: "night",
    title: "Night Subway Map",
    discription:
      "The New York subway map with acccessible stations highlighted. A view of how the subway system runs overnights.",
  },
];

const SubwayMaps = () => {
  return (
    <div className="mt-12">
      <h2 className="text-center text-4xl font-semibold">
        New York City Subway Maps
      </h2>

      <div
        className="
          mx-auto
          mt-8
          flex
          max-w-4xl
          flex-col
          gap-8
          sm:flex-row
        "
      >
        {MAPS.map((map) => (
          <Card className="overflow-hidden shadow-lg" key={map.title}>
            <CardContent className="p-0">
              <Image
                src={map.mapImg!}
                alt="ds"
                className="h-full w-full"
                width={100}
                height={100}
              />
            </CardContent>

            <CardHeader>
              <CardTitle>{map.title}</CardTitle>
              <CardDescription>
                <p className="text-lg">{map.discription}</p>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubwayMaps;
