import Container from "components/common/Container";
import style from "./Home.module.css";
import BuildingCard from "./BuildingCard";
import { PageTitle } from "components/common/PageTitle";
import type { BuildingName } from "types";
import { useFetch } from "hooks/useFetch";

function Home() {
  const [data, loading, error] = useFetch<BuildingName[]>("/building/all");

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
            data.map((building: string) => {
              return <BuildingCard key={building} building={building} />;
            })}
        </div>
      )}
    </Container>
  );
}

export default Home;
