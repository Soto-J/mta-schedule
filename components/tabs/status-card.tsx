import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

type StatusCardProps = {
  title?: string;
  alertFeeds?: any;
};

const StatusCard = ({ title, alertFeeds }: StatusCardProps) => {
  return (
    <Card className={title === `No Active Alerts` ? "h-full" : ""}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-4 gap-y-3">
          {alertFeeds &&
            Object.entries(alertFeeds)?.map(([trainLine, value]: any) => {
              const NO_SVG_YET =
                trainLine === "GS" ||
                trainLine === "6X" ||
                trainLine === "SI" ||
                trainLine === "7X" ||
                trainLine === "FS";

              if (NO_SVG_YET) {
                return;
              }

              const src = isNaN(trainLine)
                ? `/images/train-svgs/${trainLine.toLowerCase()}-letter.svg`
                : `/images/train-svgs/${trainLine}-digit.svg`;

              return (
                <div key={trainLine}>
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

export default StatusCard;
