import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { mockFetch } from "mock";
import Container from "components/common/Container";
import style from "./Home.module.css"
import BuildingCard from "./BuildingCard";

function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    mockFetch("resolve", 0)
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
        <h1 className={style.h1}>StudySpaceFinder</h1>

        {loading ? <p>Loading...</p> : 
          <div className={style.buildingContainer}>
            { data && Object.keys(data).map((key: any) => {
              return <BuildingCard building={key}/>
            })}
          </div>}
      </Container>
    </div>
  );
}

export default Home;
