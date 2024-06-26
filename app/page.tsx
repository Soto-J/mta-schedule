import { getSubwayAlerts } from "@/actions/subway-alerts";

import HomeTabs from "@/components/tabs/home-tabs";

export default async function Home() {
  const subwayAlerts = await getSubwayAlerts();

  return (
    <div>
      <HomeTabs subwayAlerts={subwayAlerts} />
    </div>
  );
}
