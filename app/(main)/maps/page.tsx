"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

import qs from "query-string";

import { Button } from "@/components/ui/button";
import { PuffLoader } from "react-spinners";
import SubwayMaps from "./_components/subway-maps";
import BusMaps from "./_components/bus-maps";

const MapsPage = () => {
  const [position, setPosition] = useState<number[]>();
  const [showMap, setShowMap] = useState(false);

  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map"), {
        loading: () => <PuffLoader size={200} color="white" />,
        ssr: false,
      }),
    [],
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);
        setShowMap(true);
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  const findNearestSubwayStation = async () => {
    try {
      const query = {
        latitude: position?.[0],
        longitude: position?.[1],
      };

      const url = qs.stringifyUrl({
        url: "api/subway/nearest-station",
        query,
      });

      const response = await axios.get(url);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="">
        {showMap ? (
          <Map center={position} className="z-10 h-[35vh] w-96 rounded-lg" />
        ) : (
          <PuffLoader size={200} color="white" />
        )}
      </div>

      <SubwayMaps />

      <BusMaps />

      <div className="ml-auto max-w-fit">
        <Button onClick={findNearestSubwayStation}>Search</Button>B
      </div>
    </div>
  );
};

export default MapsPage;
