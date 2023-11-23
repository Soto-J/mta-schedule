"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";

import { DropdownSelect } from "./_components/dropdown-select";

const ServiceStatusPage = () => {
  const [statusData, setStatusData] = useState();
  const [selectedLine, setSelectedLine] = useState("1");

  useEffect(() => {
    console.log(selectedLine);
  }, [selectedLine]);
  
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
      <h2 className="text-center font-bold text-6xl mb-8">Service Status</h2>

      <div className="ml-auto max-w-fit">
        <DropdownSelect
          selectedValue={(value) =>
            setSelectedLine((prevValue) => (prevValue === value ? "" : value))
          }
        />
      </div>
      <div>
        <Button onClick={status}>Get Status</Button>
      </div>
    </div>
  );
};

export default ServiceStatusPage;
