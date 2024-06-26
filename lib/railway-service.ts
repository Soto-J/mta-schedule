import {
  addAlerts,
  fetchRailwayData,
  addPlannedWork,
  getRailwayRoutes,
} from "./railway-helpers";

export const getRailwayAlerts = async () => {
  try {
    const longIslandFeed = await fetchRailwayData("long-island");
    const metroNorthFeed = await fetchRailwayData("metro-north");

    if (!longIslandFeed || !metroNorthFeed) {
      throw new Error("");
    }

    const railwayRoutes = await getRailwayRoutes();

    if (!railwayRoutes) {
      throw new Error("Something went wrong readng railways csv");
    }

    addPlannedWork(longIslandFeed, railwayRoutes);
    addAlerts(longIslandFeed, railwayRoutes);

    addPlannedWork(metroNorthFeed, railwayRoutes);
    addAlerts(metroNorthFeed, railwayRoutes);

    return railwayRoutes;
  } catch (error) {
    console.log({ error });
    throw error;
  }
};
