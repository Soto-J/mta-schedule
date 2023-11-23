"use client";

import Image from "next/image";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { DropdownSelect } from "./_components/dropdown-select";

const ServiceStatusPage = () => {
  const [statusData, setStatusData] = useState(); // TODO: [MTA-1] Create type for statusData

  const status = async () => {
    try {
      const response = await axios.get("/api/service-status/subway-alerts");

      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }

      setStatusData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="">
      <h2>Service Status</h2>

      <DropdownSelect />
      <h2>ServiceStatusPage</h2>
      <div>
        <Button onClick={status}>Get Status</Button>
      </div>
    </div>
  );
};

export default ServiceStatusPage;
