import HomeTabs from "@/components/tabs/home-tabs";
import { getRailway } from "./actions/get-railway";

export default async function Home() {
  const railways = await getRailway();

  return (
    <div className="">
      <HomeTabs railways={railways} />
    </div>
  );
}
