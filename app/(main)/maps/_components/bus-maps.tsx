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
    alt: "Bronx",
    title: "Bronx Bus Map",
    discription: "A map of the Bronx bus routes.",
  },
  {
    mapImg: "/images/maps/subway/subway-map-night.svg",
    alt: "Brooklen",
    title: "Brooklyn Bus Map",
    discription: "A map of the Brooklyn bus routes.",
  },
  {
    mapImg: "/images/maps/subway/subway-map-night.svg",
    alt: "Manhattan",
    title: "Manhattan Bus Map",
    discription: "The regular service Manhattan bus map.",
  },
  {
    mapImg: "/images/maps/subway/subway-map-night.svg",
    alt: "Queens",
    title: "Queens Bus Map",
    discription: "A map of the Queens bus routes.",
  },
  {
    mapImg: "/images/maps/subway/subway-map-night.svg",
    alt: "night",
    title: "Staten Island Bus Map",
    discription: "A map of the Staten Island bus routes",
  },
  {
    mapImg: "/images/maps/subway/subway-map-night.svg",
    alt: "night",
    title: "Staten Island Express Bus Map",
    discription: "Only express bus routes",
  },
];

const BusMaps = () => {
  return (
    <div className="mt-24">
      <h2 className="text-center text-4xl font-semibold lg:text-start">
        New York City Bus Maps
      </h2>

      <div
        className="
          mx-auto
          mt-8
          grid
          grid-cols-2
          gap-8
          lg:grid-cols-3
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

export default BusMaps;
