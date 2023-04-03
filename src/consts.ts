export const dateOptions = [
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
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
export const API =
  process.env.NODE_ENV === "production"
    ? process.env.API
    : "http://127.0.0.1:8000";

if (API === "") throw new Error(`Missing API env variable on prod`);

export const ENDPOINTS = {
  getAllBuildings: `${API}/api/buildings/all`,
  getBuilding: `${API}/api/buildings`,
  getRoom: `${API}/api/rooms`,
};

// ABOUT RELATED
export const DISCLAIMER =
  "Study Space Finder is an interface developed by students of University of Victoria (UVic).\nPlease note that the information provided on this platform is based on the schedules found in UVic officials. However, we remain independent and there may be certain information that we do not have access to. Therefore, we cannot guarantee the accuracy, completeness, or reliability of the information provided. We strongly recommend that users verify any information obtained from this platform with official sources before making any decisions or taking any actions based on such information. By using this platform, you acknowledge and agree that you assume full responsibility for any decisions or actions taken based on the information provided.\nEnjoy.";

export const CONTRIBUTORS = [
  { name: "Scott", github: "https://github.com/Scott-Kenning" },
  { name: "Liam", github: "https://github.com/liamsquires" },
  { name: "Devin", github: "https://github.com/DevinFrioud" },
  { name: "Hal", github: "https://github.com/hn275" },
];

export enum SOURCE {
  client = "https://github.com/Scott-Kenning/StudySpaceFinder",
  api = "https://github.com/hn275/StudySpaceFinder",
}
