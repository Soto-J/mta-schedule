"use client";

import { Button } from "./ui/button";
import axios from "axios";

const ServiceAlertButton = () => {
  const search = async () => {
    try {
      const response = await axios.get("/api/subway/service-alerts");

      console.log(response.data);
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
