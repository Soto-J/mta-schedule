import Link from "next/link";

import { LightDarkToggle } from "./light-dark-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const navigationLinks = (
    <>
      <Link href="/schedules">Schedules</Link>
      <Link href="/maps">Maps</Link>
      <Link href="/fairs-tolls">Fairs and Tolls</Link>
      <Link href="/service-status">Service Status</Link>
    </>
  );

  return (
    <nav className="bg-red-500 h-18 border-b shadow-md p-4">
      <div className="flex justify-between items-center px-10">
        <Link href="/">LOGO</Link>

        <div className="hidden md:flex gap-x-8 text-lg">{navigationLinks}</div>

        <div className="flex gap-x-8">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu size={32} />
              </Button>
            </SheetTrigger>

            <SheetContent>
              <div className="flex flex-col gap-y-4 p-4 text-lg">
                {navigationLinks}
              </div>
            </SheetContent>
          </Sheet>

          <LightDarkToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
