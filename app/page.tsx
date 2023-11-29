import Link from "next/link";

import RouteSearch from "@/components/route-search";
import HomeTabs from "../components/tabs/home-tabs";
import ServiceAlertButton from "@/components/service-alert-button";

export default function Home() {
  return (
    <div className="">
      <HomeTabs />

      <div className="mx-auto mt-4 max-w-fit">
        <ServiceAlertButton />
      </div>
    </div>
  );
}
