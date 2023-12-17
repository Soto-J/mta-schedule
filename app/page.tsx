"use client";

import { useState } from "react";

import HomeTabs from "@/components/tabs/home-tabs";
import ServiceAlertButton from "@/components/service-alert-button";

export default function Home() {
  const [tempState, setTempSate] = useState();

  return (
    <div className="">
      <HomeTabs />
    </div>
  );
}
