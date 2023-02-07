import { useState, useEffect } from "react";
import { API } from "consts";

export function useFetch<T>(path: string): [T | null, boolean, string | null] {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(API + path, { method: "GET" });

        const { status } = response;
        switch (status) {
          case 400:
            setError(() => "Bad request."); // TODO: ask Scott about this message
            break;

          case 404:
            setError(() => "Cannot locate resources.");
            break;

          case 200:
            const data = await response.json();
            setData(() => data);
            break;

          default:
            throw new Error(`unhandled status code: ${status}`);
        }

        setLoading(() => false);
      } catch (e) {
        setError(() => "Something went wrong, try again later.");
        console.log(e);
      }
    })();
  }, [path]);

  return [data, loading, error];
}
