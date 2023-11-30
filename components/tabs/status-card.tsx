import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";

type StatusCardProps = {
  title?: string;
  trains?: any;
};

const StatusCard = ({ title, trains }: StatusCardProps) => {
  trains = trains?.filter((train: string) => {
    return train !== "GS" && train !== "6X" && train !== "SI" && train !== "7X";
  });

  return (
    <Card className={title === `No Active Alerts` ? "h-full" : ""}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-4 gap-y-3">
          {trains &&
            trains?.map((icon: string, index: number) => (
              <div key={index}>
                <Image
                  src={
                    isNaN(icon as any)
                      ? `/images/train-svgs/${icon.toLowerCase()}-letter.svg`
                      : `/images/train-svgs/${icon}-digit.svg`
                  }
                  alt="/"
                  width={30}
                  height={30}
                />
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
