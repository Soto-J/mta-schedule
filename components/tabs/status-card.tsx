import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";

type StatusCardProps = {
  status?: string;
  title: string;
  trainIcons?: React.ReactNode[];
};

const StatusCard = ({ status, title, trainIcons }: StatusCardProps) => {
  return (
    <Card key={title}>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          {trainIcons?.map((icon, index) => (
            <div key={index}>
              <Image src="/" alt="/" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
