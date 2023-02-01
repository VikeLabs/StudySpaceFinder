import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { mockFetch } from "mock";
import Container from "components/common/Container";
import style from "./Home.module.css";
import BuildingCard from "./BuildingCard";
import { PageTitle } from "components/common/PageTitle";
import { BuildingTime } from "types";

function Home() {
  const [data, setData] = useState<BuildingTime | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockFetch("resolve", 0)
      .then((response) => response.json())
      .then((data) => {
        setData(() => data as BuildingTime);
        // console.log(data["Bob Wright Centre"]);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(() => false));
  }, []);

  return (
    <Container>
      {/* <h1 className={style.h1}>StudySpaceFinder</h1> */}
      <PageTitle name={"Buildings"} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={style.buildingContainer}>
          {data &&
            Object.keys(data).map((building: string) => {
              return <BuildingCard key={building} building={building} />;
            })}
        </div>
      )}
    </Container>
  );
}

export default Home;
