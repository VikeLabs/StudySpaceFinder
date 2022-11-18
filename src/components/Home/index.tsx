import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { mockFetch } from "mock";

function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    mockFetch("resolve", 1000)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data)
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Link to="about">Click to view our about page</Link>
      <h1>StudySpaceFinder</h1>
      { loading && <p>Loading...</p> }
      { data && Object.keys(data).map((key: any) => {
        return <p>{key}</p>
      })}
    </div>
  );
}

export default Home;
