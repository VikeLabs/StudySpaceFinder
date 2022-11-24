import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { mockFetch } from "mock";
import Container from "components/common/Container";
import style from "./Home.module.css"

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
    <div className={style.home}>
      <Container>
      {/* <Link to="about">Click to view our about page</Link> */}
        <h1>StudySpaceFinder</h1>

        {loading ? <p>Loading...</p> : 
          <div className="buildingContainer">
            { data && Object.keys(data).map((key: any) => {
              return <p>{key}</p>
            })}
          </div>}
      </Container>
    </div>
  );
}

export default Home;
