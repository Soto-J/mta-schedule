import Image from "next/image";

import { FilteredAlert } from "@/lib/subway-helpers";

import { ScrollArea } from "../../ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

type StatusCardProps = {
  title?: string;
  alertFeeds?: FilteredAlert;
};

export const SubwayStatusCard = ({ title, alertFeeds }: StatusCardProps) => {
  const excludeSubwayLines = ["GS", "6X", "SI", "7X", "FS"];

  return (
    <Card className={title === `No Active Alerts` ? "h-full" : ""}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-[20%_20%_20%_20%] gap-2">
          {alertFeeds &&
            Object.entries(alertFeeds)?.map(([trainLine, value]) => {
              if (excludeSubwayLines.includes(trainLine)) {
                return;
              }

              const isDigit = !isNaN(Number(trainLine));

              const src = isDigit
                ? `/images/train-svgs/${trainLine}-digit.svg`
                : `/images/train-svgs/${trainLine.toLowerCase()}-letter.svg`;

              return (
                <div key={trainLine} className="col-span-1">
                  <Dialog>
                    <DialogTrigger>
                      <Image
                        src={src}
                        alt={trainLine}
                        width={30}
                        height={30}
                        className="cursor-pointer"
                      />
                    </DialogTrigger>

                    <DialogContent className="w-[95%]">
                      <ScrollArea className="max-h-96 p-1.5">
                        {value.map((alert: any, i: number) => {
                          const description =
                            alert.descriptionText?.translation?.[0].text;

                          const header = alert.headerText.translation?.[0].text;

                          return (
                            <div key={i}>
                              <DialogHeader>
                                <DialogTitle className="text-start">
                                  {header}
                                </DialogTitle>
                              </DialogHeader>

                              <DialogDescription className="my-4">
                                {description}
                              </DialogDescription>
                            </div>
                          );
                        })}
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </div>
              );
            })}
        </div>
      </CardContent>
    </Card>
  );
};
