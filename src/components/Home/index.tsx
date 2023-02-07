import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { mockFetch } from "mock";
import Container from "components/common/Container";
import style from "./Home.module.css";
import BuildingCard from "./BuildingCard";
import { PageTitle } from "components/common/PageTitle";
import type { BuildingTime } from "types";
import { useFetch } from "hooks/useFetch";

function Home() {
  const [data, loading, error] = useFetch<BuildingTime>("/all");

  return (
    <Container>
      {/* <h1 className={style.h1}>StudySpaceFinder</h1> */}
      <PageTitle name={"Buildings"} />
      {error ? (
        <p>{error}</p>
      ) : loading ? (
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
