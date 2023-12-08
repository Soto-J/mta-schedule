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
    mapImg: "/images/maps/bus/bus-map-bronx.jpg",
    alt: "Bronx",
    title: "Bronx Bus Map",
    discription: "A map of the Bronx bus routes.",
  },
  {
    mapImg: "/images/maps/bus/bus-map-brooklyn.jpg",
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
          grid-cols-1
          gap-8
          sm:grid-cols-2
          lg:grid-cols-3
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
                className=" h-full w-full"
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

export default BusMaps;
