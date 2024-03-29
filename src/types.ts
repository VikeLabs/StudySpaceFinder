export enum Day {
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
}

export interface Building {
  id: number;
  name: string;
}

export interface Classroom {
  id: number;
  current_class: string;
  room_id: number;
  room: string;
  next_class?: string;
  subject?: string;
}

export interface ClassroomSummary {
  building: string;
  data: Classroom[];
}

