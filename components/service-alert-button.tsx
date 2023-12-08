"use client";

import { Button } from "./ui/button";
import axios from "axios";

type ServiceAlertButtonProps = {
  getData: (data: any) => void;
};

const ServiceAlertButton = ({ getData }: ServiceAlertButtonProps) => {
  const search = async () => {
    try {
      const response = await axios.get("/api/service-status/subway-alerts");

      getData(response.data);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Button onClick={search} className="">
      Search
    </Button>
  );
};

export default ServiceAlertButton;
