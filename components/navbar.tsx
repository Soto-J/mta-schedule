import Link from "next/link";
import React from "react";
import { LightDarkToggle } from "./light-dark-toggle";

const Navbar = () => {
  return (
    <nav className="bg-red-500 h-18 border-b shadow-md p-4">
      <div className="flex justify-between items-center px-10">
        <div className="">LOGO</div>
        <div className="flex gap-x-8 text-lg">
          <Link href="/schedules">Schedules</Link>
          <Link href="/maps">Maps</Link>
          <Link href="/fairs-tolls">Fairs and Tolls</Link>
        </div>

        <LightDarkToggle />
      </div>
    </nav>
  );
};

export default Navbar;
