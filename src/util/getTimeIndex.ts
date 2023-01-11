export const getTimeIndex = (time: string): number => {
  const secondAtZeroIndex = 8 * 3600;
  const halfHourInSecond = 30 * 60;
  const currentTimeSecond = timeToSecond(time);

  const timeDiff = currentTimeSecond - secondAtZeroIndex;

  return Math.floor(timeDiff / halfHourInSecond);
};

function timeToSecond(time: string): number {
  const timeSplit = time.split(":");

  if (timeSplit.length !== 2) {
    throw new Error(`Invalid time format\nexpected: HH:MM\ngot: ${time}`);
  }

  const [h, m] = timeSplit;
  const hour = parseInt(h);
  const min = parseInt(m);

  return hour * 3600 + min * 60;
}
