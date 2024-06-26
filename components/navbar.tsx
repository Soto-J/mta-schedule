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
import Image from "next/image";

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
    <nav className="h-18 border-b p-4 shadow-md dark:bg-muted">
      <div className="flex items-center justify-between md:px-10">
        <Link href="/">
          <Image src="/images/logo.svg" alt="Logo" width={50} height={50} />
        </Link>

        {/* <div className="hidden gap-x-8 text-lg md:flex">{navigationLinks}</div> */}

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
