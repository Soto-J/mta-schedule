"use client";

import axios from "axios";

import { Button } from "./ui/button";

const url =
  "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace";

const Testing = () => {
  const search = async () => {
    try {
      const response = await axios.get("/api/subway");

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

export default Testing;
