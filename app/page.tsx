import Link from "next/link";

import Testing from "@/components/testing";
import HomeTabs from "./_components/home-tabs";

export default function Home() {
  return (
    <div className="">
      {/* <h2 className="hidden bg-red-500 text-3xl font-semibold md:flex">
        <Link href="/service-status">Service Status</Link>
      </h2> */}

      <HomeTabs />

      {/* <Testing /> */}
    </div>
  );
}
