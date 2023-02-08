export enum Day {
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
}

export interface Time {
  time_display: string;
  time_start: number;
  time_end: number;
}

export interface RoomData {
  course: string;
  start_time: string;
  end_time: string;
}

export interface BuildingData {
  [key: string]: {
    [key in keyof typeof Day]: boolean[];
  };
}

export type BuildingName = string;
