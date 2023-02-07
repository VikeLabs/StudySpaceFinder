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
  time: Time;
  course: string;
}

export interface BuildingData {
  // building: { room: { day: RoomData[] } }
  [key: string]: {
    [key: string]: {
      [key in keyof typeof Day]: RoomData[];
    };
  };
}

export type BuildingName = string;
