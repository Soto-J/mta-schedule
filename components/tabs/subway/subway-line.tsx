import Image from "next/image";

import { SubwayAlert } from "@/lib/subway-helpers";

import { SubwayAlertContent } from "./subway-alert-content";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type SubwayLineProps = {
  line: string;
  alerts: SubwayAlert[];
};

export const SubwayLine = ({ line, alerts }: SubwayLineProps) => {
  const isDigit = !isNaN(Number(line));
  const src = isDigit
    ? `/images/train-svgs/${line}-digit.svg`
    : `/images/train-svgs/${line.toLowerCase()}-letter.svg`;

  return (
    <div key={line} className="col-span-1">
      <Dialog>
        <DialogTrigger>
          <Image
            src={src}
            alt={line}
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </DialogTrigger>
        <DialogContent className="max-w-xl md:max-w-2xl">
          <ScrollArea className="max-h-96 p-2">
            <SubwayAlertContent alerts={alerts} />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};
