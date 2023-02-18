import Container from "components/common/Container";
import style from "./Home.module.css";
import BuildingCard from "./BuildingCard";
import { PageTitle } from "components/common/PageTitle";
import type { Building } from "types";
import { useFetch } from "hooks/useFetch";

function Home() {
  const [data, loading, error] = useFetch<Building[]>("/building/all");

  return (
    <Container>
      <PageTitle name={"Buildings"} />
      {error ? (
        <p>{error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <div className={style.buildingContainer}>
          {data &&
            data.map((bldg: Building) => {
              return <BuildingCard key={bldg.id} building={bldg} />;
            })}
        </div>
      )}
    </Container>
  );
}

export default Home;
