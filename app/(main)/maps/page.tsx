"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

const MapsPage = () => {
  const [position, setPosition] = useState<[number, number]>();

  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setPosition([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  useEffect(() => {
    console.log(position);
  }, [position]);

  return (
    <main>
      <h2 className="font-bold text-6xl text-center">Maps</h2>

      <div className="mt-10">
        <Map
          center={position}
          className="h-[35vh] w-96 rounded-lg"
        />
      </div>
    </main>
  );
};

export default MapsPage;
