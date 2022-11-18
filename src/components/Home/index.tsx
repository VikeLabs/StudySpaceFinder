import { Link } from "react-router-dom";
import { useEffect } from "react";
import { mockFetch } from "mock";

function Home() {
  useEffect(() => {
    mockFetch("resolve")
      .then((response) => response.json())
      .then((buildings) => {
        console.log(buildings);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <h1>This is the home page</h1>
      <Link to="about">Click to view our about page</Link>
    </div>
  );
}

export default Home;
