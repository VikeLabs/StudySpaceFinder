/**
 * @param {string} status: - passing in "resolve" will ensure the operation is resolved all
 *                           the way through.
 *                         - passing in "reject" will ensure the operation fails.
 * @param {number?} timeout: time in milliseconds, mock fetching request time.
 * @returns {void}
 * */
import * as data from "./data.json";

export const mockFetch = (
  status: "resolve" | "reject",
  timeout = 0
): Promise<any> => {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      setTimeout(() => {
        resolve({
          //
          json: () =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                if (status === "reject") {
                  reject(new Error("rejected"));
                }

                resolve(data);
              }, timeout / 2);
            }),
          //
        });
      }, timeout / 2);
    });
  });
};

/* 
mockFetch("reject", 0)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((e) => {
    console.log("caught error");
    console.log((e as Error).message);
  })
  .finally(() => {
    console.log("end call");
  });

(async () => {
  try {
    const response = await mockFetch("resolve", 100);
    const data = await response.json();

    console.log(data);
  } catch (e) {
    console.log((e as Error).message);
  } finally {
    console.log("end call");
  }
})();
*/
