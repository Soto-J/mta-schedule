"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

import qs from "query-string";

import { Button } from "@/components/ui/button";

const MapsPage = () => {
  const [position, setPosition] = useState<number[]>();

  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    [],
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setPosition([position.coords.latitude, position.coords.longitude]);
    });
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
        <Map center={position} className="z-10 h-[35vh] w-96 rounded-lg" />
      </div>
      <Button onClick={findNearestSubwayStation}>Search</Button>
    </div>
  );
};

export default MapsPage;
