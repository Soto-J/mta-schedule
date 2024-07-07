import { GtfsAlert } from "./subway-helpers";

// FOR NOW
export type Railway = {
  route_id: string;
  agency_id?: string;
  route_long_name: string;
  route_type: string;
  route_color: string;
  route_text_color: string;
  feeds?: {
    alerts?: GtfsAlert[];
    plannedWork?: GtfsAlert[];
  };
};

export const MNRoutes: Railway[] = [
  {
    route_id: "3",
    agency_id: "1",
    route_long_name: "New Haven",
    route_type: "2",
    route_color: "EE0034",
    route_text_color: "FFFFFF",
    feeds: {},
  },
  {
    route_id: "4",
    agency_id: "1",
    route_long_name: "New Canaan",
    route_type: "2",
    route_color: "EE0034",
    route_text_color: "FFFFFF",
    feeds: {},
  },
  {
    route_id: "5",
    agency_id: "1",
    route_long_name: "Danbury",
    route_type: "2",
    route_color: "EE0034",
    route_text_color: "FFFFFF",
    feeds: {},
  },
  {
    route_id: "6",
    agency_id: "1",
    route_long_name: "Waterbury",
    route_type: "2",
    route_color: "EE0034",
    route_text_color: "FFFFFF",
    feeds: {},
  },
  {
    route_id: "1",
    agency_id: "1",
    route_long_name: "Hudson",
    route_type: "2",
    route_color: "009B3A",
    route_text_color: "FFFFFF",
    feeds: {},
  },
  {
    route_id: "2",
    agency_id: "1",
    route_long_name: "Harlem",
    route_type: "2",
    route_color: "0039A6",
    route_text_color: "FFFFFF",
    feeds: {},
  },
];

export const LIRoutes = [
  {
    route_id: "1",
    route_long_name: "Babylon Branch",
    route_type: "2",
    route_color: "00985F",
    route_text_color: "FFFFFF",
    feeds: {},
  },
  {
    route_id: "2",
    route_long_name: "Hempstead Branch",
    route_type: "2",
    route_color: "CE8E00",
    route_text_color: "FFFFFF",
    feeds: {},
  },
  {
    route_id: "3",
    route_long_name: "Oyster Bay Branch",
    route_type: "2",
    route_color: "00AF3F",
    route_text_color: "FFFFFF",
    feeds: {},
  },
  {
    route_id: "4",
    route_long_name: "Ronkonkoma Branch",
    route_type: "2",
    route_color: "A626AA",
    route_text_color: "FFFFFF",
    feeds: {},
  },
  {
    route_id: "5",
    route_long_name: "Montauk Branch",
    route_type: "2",
    route_color: "00B2A9",
    route_text_color: "121212",
    feeds: {},
  },
  {
    route_id: "6",
    route_long_name: "Long Beach Branch",
    route_type: "2",
    route_color: "FF6319",
    route_text_color: "FFFFFF",
    feeds: {},
  },
  {
    route_id: "7",
    route_long_name: "Far Rockaway Branch",
    route_type: "2",
    route_color: "6E3219",
    route_text_color: "FFFFFF",
    feeds: {},
  },
  {
    route_id: "8",
    route_long_name: "West Hempstead Branch",
    route_type: "2",
    route_color: "00A1DE",
    route_text_color: "121212",
    feeds: {},
  },
  {
    route_id: "9",
    route_long_name: "Port Washington Branch",
    route_type: "2",
    route_color: "C60C30",
    route_text_color: "FFFFFF",
    feeds: {},
  },
  {
    route_id: "10",
    route_long_name: "Port Jefferson Branch",
    route_type: "2",
    route_color: "006EC7",
    route_text_color: "FFFFFF",
    feeds: {},
  },
  {
    route_id: "11",
    route_long_name: "Belmont Park",
    route_type: "2",
    route_color: "60269E",
    route_text_color: "FFFFFF",
    feeds: {},
  },
  {
    route_id: "12",
    route_long_name: "City Terminal Zone",
    route_type: "2",
    route_color: "4D5357",
    route_text_color: "FFFFFF",
    feeds: {},
  },
];
