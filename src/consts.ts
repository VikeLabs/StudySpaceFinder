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
