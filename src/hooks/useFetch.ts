import { useState, useEffect } from "react";
import { API } from "consts";

export function useFetch<T>(
  suffix: string
): [T | null, boolean, string | null] {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(API + suffix, { method: "GET" });

        const { status } = response;
        switch (status) {
          case 200:
            const data = await response.json();
            setData(() => data);
            break;

          case 400 | 404:
            setError(() => "Cannot locate resources.");
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
  }, []);

  return [data, loading, error];
}
