import Link from "next/link";

import Testing from "@/components/testing";
import HomeTabs from "./_components/home-tabs";

export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <h2 className="flex bg-red-500 text-3xl font-semibold">
        <Link href="/service-status">Service Status</Link>
      </h2>

      <HomeTabs />

      {/* <Testing /> */}
    </div>
  );
}
