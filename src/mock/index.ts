/**
 * mockFetch(status, timeout)
 * @param {string?} status: - passing in "resolve" will ensure the operation is resolved all
 *                            the way through.
 *                          - passing in "reject" will ensure the operation fails.
 *                          - passing in anything else (string | undefined) has
 *                            a 30% chance of failing
 * @param {number?} timeout: time in milliseconds, mock fetching request time.
 * */
import * as data from "./data.json";

export const mockFetch = (status?: string, timeout = 0): Promise<any> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (status === "reject") {
        reject(new Error("rejected by promise"));
      }

      setTimeout(() => {
        resolve({
          //
          json: () =>
            new Promise((resolve, reject) => {
              try {
                const randomNumber = Math.floor(Math.random() * 10);
                setTimeout(() => {
                  // 30% chance it fails
                  if (randomNumber < 3 && status !== "resolve") {
                    reject(new Error("rejected by sub-promise"));
                  }

                  resolve(data);
                }, timeout / 2);
              } catch (e) {
                reject(e);
              }
            }),
          //
        });
      }, timeout / 2);
    });
  });

/* 
mockFetch("resolve", 0)
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
    const response = await mockFetch("", 100); // 100 milliseconds timeout
    const data = await response.json();

    console.log(data);
  } catch (e) {
    console.log((e as Error).message);
  } finally {
    console.log("end call");
  }
})();
*/
