import Container from "components/common/Container";
import styles from "./Home.module.css";
import BuildingCard from "./BuildingCard";
import { PageTitle } from "components/common/PageTitle";
import type { Building } from "types";
import { useFetch } from "hooks/useFetch";
import { useState } from "react";
import SearchBar from "components/common/SearchBar";
import { ENDPOINTS } from "consts";

function Home() {
  const [data, loading, error] = useFetch<Building[]>(
    ENDPOINTS.getAllBuildings
  );
  const [search, setSearch] = useState<string>();

  return (
    <Container>
      <PageTitle name={"Buildings"} />
      <div className={styles.searchContainer}>
        <SearchBar onChange={setSearch} keyword={search} />
      </div>
      {error ? (
        <p>{error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.buildingContainerGrid}>
          {data &&
            data
              .filter((bldg) => {
                return search
                  ? bldg.name.toLowerCase().includes(search.toLowerCase())
                  : bldg;
              })
              .map((bldg: Building) => {
                return <BuildingCard key={bldg.id} building={bldg} />;
              })}
        </div>
      )}
    </Container>
  );
}

export default Home;
