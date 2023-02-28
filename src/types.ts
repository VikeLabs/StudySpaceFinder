export enum Day {
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
}

// TODO: delete
export interface Time {
  time_display: string;
  time_start: number;
  time_end: number;
}

// TODO: delete
export interface RoomData {
  time: Time;
  course: string;
}

// TODO: delete
export interface BuildingData {
  // building: { room: { day: RoomData[] } }
  [key: string]: {
    [key: string]: {
      [key in keyof typeof Day]: RoomData[];
    };
  };
}

// TODO: delete
export interface BuildingTime {
  // building: { room: { day: boolean[] } }
  [key: string]: {
    [key: string]: {
      [key in keyof typeof Day]: boolean[];
    };
  };
}

export interface Building {
  id: number;
  name: string;
}
