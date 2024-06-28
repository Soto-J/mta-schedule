import {
  alertFilter,
  fetchRailwayData,
  plannedWorkFilter,
  railwayCSVData,
} from "./railway-helpers";

export const getRailwayAlerts = async () => {
  try {
    const longIslandFeed = await fetchRailwayData("long-island");
    const metroNorthFeed = await fetchRailwayData("metro-north");

    if (!longIslandFeed || !metroNorthFeed) {
      throw new Error("");
    }

    const railwaysData = await railwayCSVData();

    if (!railwaysData) {
      throw new Error("Something went wrong readng railways csv");
    }

    // ***** Long Island *****
    plannedWorkFilter(longIslandFeed, railwaysData);
    const longIslandAlerts = alertFilter(longIslandFeed);

    Object.entries(longIslandAlerts).forEach(([key, alerts]) => {
      const rail = railwaysData.longIsland.find(
        (railway: any) => String(railway.route_id) === key,
      );

      if (!rail) return;

      rail.feeds.alerts.push(...alerts);
    });

    // ***** Metro North *****
    plannedWorkFilter(metroNorthFeed, railwaysData);
    const metroNorthAlerts = alertFilter(metroNorthFeed);

    Object.entries(metroNorthAlerts).forEach(([key, alerts]) => {
      const rail = railwaysData.metroNorth.find(
        (railway: any) => String(railway.route_id) === key,
      );

      if (!rail) return;

      rail.feeds.alerts.push(...alerts);
    });

    return {
      railwaysData,
      longIslandFeed: longIslandFeed,
      metroNorthFeed: metroNorthFeed,
      // serviceStatusLI: {
      //   longIslandAlerts,
      //   longIslandPlannedWork,
      // },
    };
  } catch (error) {
    console.log({ error });
    throw new Error("[Internal Error]: 500");
  }
};
