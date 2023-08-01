export const dateOptions = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
];

export const vikeLabsText = `
  text
`;

export const aboutText = `
  StudySpaceFinder is a Vikelabs project that displays which classrooms are empty 
  on campus. We use data from UVic's course registration system to find when classes 
  are booked. Note that this is not a source of truth, as there are things such as 
  guest seminars or UVic clubs that book rooms that aren't shown here.
`;

// API RELATED

const isDev = process.env.NODE_ENV === "development";
const FLY = isDev ? "http://127.0.0.1:8080" : "https://uvic-api.fly.dev";
export const API = {
  getAllBuildings: `${FLY}/ssf/buildings`,
  getBuilding: `${FLY}/ssf/buildings`,
  getRoom: `${FLY}/ssf/rooms`,
};

// ABOUT RELATED
export const DISCLAIMER =
  "Study Space Finder is an interface developed by students of University of Victoria (UVic).\nPlease note that the information provided on this platform is based on the schedules found in UVic officials. However, we remain independent and there may be certain information that we do not have access to. Therefore, we cannot guarantee the accuracy, completeness, or reliability of the information provided. We strongly recommend that users verify any information obtained from this platform with official sources before making any decisions or taking any actions based on such information. By using this platform, you acknowledge and agree that you assume full responsibility for any decisions or actions taken based on the information provided.\nEnjoy.";

export const CONTRIBUTORS = [
  { name: "Scott", github: "https://github.com/Scott-Kenning" },
  { name: "Liam", github: "https://github.com/liamsquires" },
  { name: "Hal", github: "https://github.com/hn275" },
];

export enum SOURCE {
  client = "https://github.com/Scott-Kenning/StudySpaceFinder",
  api = "https://github.com/hn275/StudySpaceFinder",
}

export enum COLORS {
  accentMain = "#7e22ce",
}
