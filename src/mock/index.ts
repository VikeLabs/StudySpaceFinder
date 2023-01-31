/**
 * @param {string} status: - passing in "resolve" will ensure the operation will be resolved
 *                         - passing in "reject" will ensure the operation fails.
 * @param {number?} timeout: time in milliseconds, mock fetching request time.
 * */
import data from "./building_time_intervals_0.1.json";

export const mockFetch = (
  status: "resolve" | "reject",
  timeout = 0
): Promise<any> => {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve({
        //
        json: () =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              if (status === "resolve") {
                resolve(data);
              }

              reject(new Error("rejected"));
            }, timeout / 2);
          }),
        //
      });
    }, timeout / 2);
  });
};
