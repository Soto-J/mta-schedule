"use client";

import { useState } from "react";

import HomeTabs from "@/components/tabs/home-tabs";
import ServiceAlertButton from "@/components/service-alert-button";

export default function Home() {
  const [tempState, setTempSate] = useState();

  return (
    <div className="">
      <HomeTabs alertData={tempState} />

      <div className="mx-auto mt-4 max-w-fit">
        <ServiceAlertButton getData={(data) => setTempSate(data)} />
      </div>
    </div>
  );
}
