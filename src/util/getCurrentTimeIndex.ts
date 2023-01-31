export const getCurrentTimeIndex = () => {
  let d = new Date()
  let e: any = new Date(d);
  let secondsSinceMidnight = Math.floor((e - d.setHours(0,0,0,0)) / 1000);
  const index = Math.floor(secondsSinceMidnight / 1800) - 16
  return index > 27 ? 0 : index
}