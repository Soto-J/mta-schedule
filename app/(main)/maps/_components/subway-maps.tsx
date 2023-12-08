import {
  Card,
  CardContent,
  CardDescription,
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
                priority
                src={map.mapImg || ""}
                alt={map.alt || ""}
                quality={100}
                width={400}
                height={400}
                className="h-full w-full"
              />
            </CardContent>

            <CardHeader>
              <CardTitle>{map.title}</CardTitle>
              <CardDescription className="text-lg">
                {map.discription}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubwayMaps;
