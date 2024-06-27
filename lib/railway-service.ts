import {
  fetchRailwayData,
  getRailways,
  plannedWorkFilter,
} from "./railway-helpers";

export const getRailwayAlerts = async () => {
  try {
    const longIslandFeed = await fetchRailwayData("long-island");
    const metroNorthFeed = await fetchRailwayData("metro-north");

    if (!longIslandFeed || !metroNorthFeed) {
      throw new Error("");
    }

    const railways = await getRailways();

    if (!railways) {
      throw new Error("Something went wrong readng railways csv");
    }

    // ***** Long Island *****
    const longIslandPlannedWork = plannedWorkFilter(longIslandFeed);

    Object.entries(longIslandPlannedWork).forEach(([routeId, alerts]) => {
      const rail = railways.longIsland.find(
        (railway: any) => String(railway.route_id) === routeId,
      );

      if (!rail) return;

      rail.feeds.plannedWork.push(...alerts);
    });
    console.log({ feed: longIslandPlannedWork[0] });

    // Alerts
    const longIslandAlerts = longIslandFeed.reduce((obj, entity) => {
      entity.alert?.informedEntity?.forEach((ent) => {
        const { routeId } = ent;

        if (entity.id.includes("alert") && routeId) {
          if (!obj[routeId]) {
            obj[routeId] = [];
          }

          obj[routeId].push(entity.alert);
        }
      });

      return obj;
    }, {} as any);

    Object.entries(longIslandAlerts).forEach(([key, value]) => {
      const rail = railways.longIsland.find(
        (railway: any) => String(railway.route_id) === key,
      );

      if (!rail) return;

      rail.feeds.alerts.push(...(value as any[]));
    });

    // ***** Metro North *****
    // Planned Work
    const metroNorthPlannedWork = plannedWorkFilter(metroNorthFeed);

    Object.entries(metroNorthPlannedWork).forEach(([key, value]) => {
      const rail = railways.metroNorth.find(
        (railway: any) => String(railway.route_id) === key,
      );

      if (!rail) return;

      rail.feeds.plannedWork.push(...(value as any[]));
    });

    // Alerts
    const metroNorthAlerts = metroNorthFeed.reduce((obj, entity) => {
      entity.alert?.informedEntity?.forEach((ent) => {
        const { routeId } = ent;

        if (entity.id.includes("alert") && routeId) {
          if (!obj[routeId]) {
            obj[routeId] = [];
          }

          obj[routeId].push(entity.alert);
        }
      });

      return obj;
    }, {} as any);

    Object.entries(metroNorthAlerts).forEach(([key, value]) => {
      const rail = railways.metroNorth.find(
        (railway: any) => String(railway.route_id) === key,
      );

      if (!rail) return;

      rail.feeds.alerts.push(...(value as any[]));
    });

    return {
      railways,
      // longIslandFeed: longIslandFeed,
      // metroNorthFeed: metroNorthFeed,
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
