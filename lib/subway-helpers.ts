import axios, { AxiosRequestConfig } from "axios";

import GtfsRealtimeBindings from "gtfs-realtime-bindings";

import { subwayLines } from "@/app/(main)/service-status/_components/subway-lines";

export type GtfsAlert = GtfsRealtimeBindings.transit_realtime.IAlert;
export type GtfsEntity = GtfsRealtimeBindings.transit_realtime.IFeedEntity;

export const fetchSubwayData = async () => {
  try {
    // REALTIME FEED
    const url =
      "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fsubway-alerts";

    const config: AxiosRequestConfig = {
      responseType: "arraybuffer",
      headers: {
        "x-api-key": process.env.MTA_API_KEY,
      },
    };

    const response = await axios.get(url, config);

    if (response.status !== 200) {
      throw new Error(`${response.statusText}`);
    }

    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(response.data),
    );

    if (!feed) {
      throw new Error(`[Eternal 404]: No data`);
    }

    return feed;
  } catch (error) {
    throw error;
  }
};

export const delayedAlertsFilter = (entities: GtfsEntity[]) => {
  return entities.reduce((obj: { [key: string]: GtfsAlert[] }, entity) => {
    if (entity.id.includes("alert")) {
      const trainLine = entity.alert?.informedEntity?.[0].routeId;

      if (!trainLine) return obj;

      if (!obj[trainLine]) {
        obj[trainLine] = [];
      }

      if (!entity.alert) return obj;

      obj[trainLine].push(entity.alert);
    }

    return obj;
  }, {});
};

export const plannedWorkAlertsFilter = (entities: GtfsEntity[]) => {
  return entities.reduce((obj: { [key: string]: GtfsAlert[] }, entity) => {
    // Six hour window
    const currentDate = new Date();
    const sixHoursLater = new Date(currentDate.getTime() + 6 * 60 * 60 * 1000);

    // Planned work window
    const startWindow = new Date(entity.alert?.activePeriod?.[0].start * 1000);
    const endWindow = new Date(entity.alert?.activePeriod?.[0].end * 1000);

    const isWithinWindow =
      entity.id.includes("planned_work") &&
      ((currentDate >= startWindow && sixHoursLater <= endWindow) ||
        (currentDate <= startWindow && sixHoursLater >= startWindow) ||
        (currentDate >= startWindow && currentDate <= endWindow) ||
        (currentDate <= startWindow && sixHoursLater >= endWindow));

    if (isWithinWindow) {
      return obj;
    }

    const trainLine = entity.alert?.informedEntity?.[0].routeId;

    if (!trainLine) return obj;

    if (!obj[trainLine]) {
      obj[trainLine] = [];
    }

    if (!entity.alert) return obj;

    obj[trainLine].push(entity.alert);

    return obj;
  }, {});
};

export const noScheduledServicesFilter = (entities: GtfsEntity[]) => {
  return entities.reduce((obj: { [key: string]: GtfsAlert[] }, entity) => {
    const isNoService =
      entity.alert?.headerText?.translation?.[0].text.includes("No") &&
      entity.alert?.headerText?.translation?.[0].text.includes(
        "trains running",
      );

    if (isNoService) {
      const trainLine = entity.alert?.informedEntity?.[0].routeId;

      if (!trainLine) return obj;

      if (!obj[trainLine]) {
        obj[trainLine] = [];
      }

      if (!entity.alert) return obj;

      obj[trainLine].push(entity.alert);
    }

    return obj;
  }, {});
};

export type FilteredAlert = { [key: string]: GtfsAlert[] };

export const noActiveAlertsFilter = (
  delayAlerts: FilteredAlert,
  plannedWorkAlerts: FilteredAlert,
  noScheduledServices: FilteredAlert,
) => {
  //Use active train lines to compare
  const activeLines = [
    ...Object.keys(delayAlerts),
    ...Object.keys(plannedWorkAlerts),
    ...Object.keys(noScheduledServices),
  ];

  const alert = {
    descriptionText: {
      translation: [{ text: "No Active Alerts" }],
    },
    headerText: {
      translation: [{ text: "No Active Alerts" }],
    },
  };

  return subwayLines.reduce((obj: { [key: string]: any }, line) => {
    const isNotActive = !activeLines.includes(line.id);

    if (isNotActive) {
      if (!obj[line.id]) {
        obj[line.id] = [];
      }

      obj[line.id].push(alert);
    }

    return obj;
  }, {});
};

export const plannedWorkFilterTest = (entities: GtfsEntity[]) => {
  return entities.reduce((obj: { [key: string]: GtfsAlert[] }, entity) => {
    const currentDate = new Date();
    const sixHoursLater = new Date(currentDate.getTime() + 6 * 60 * 60 * 1000);
    // planned work window
    const plannedStart = new Date(entity.alert?.activePeriod?.[0].start * 1000);
    const plannedEnd = new Date(entity.alert?.activePeriod?.[0].end * 1000);

    const isWithinWindow =
      entity.id.includes("planned_work") &&
      (sixHoursLater < plannedStart || currentDate > plannedEnd);

    if (isWithinWindow) {
      const trainLine = entity.alert?.informedEntity?.[0].routeId;

      if (!trainLine) return obj;

      if (!obj[trainLine]) {
        obj[trainLine] = [];
      }

      if (!entity.alert) return obj;
      obj[trainLine].push(entity.alert);
    }

    return obj;
  }, {});
};
