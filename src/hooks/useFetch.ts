import { useState, useEffect } from "react";

export function useFetch<T>(path: string): [T | null, boolean, string | null] {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(() => true);
      try {
        const response = await fetch(path, { method: "GET" });
        const { status } = response;
        const payload = await response.json();
        status === 200
          ? setData(() => payload)
          : setError(() => payload["detail"]);
      } catch (e) {
        setError(() => "Server is not responding, try again later.");
        console.log(e);
      } finally {
        setLoading(() => false);
      }
    })();
  }, [path]);

  return [data, loading, error];
}
