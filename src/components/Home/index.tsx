import Container from "components/common/Container";
import styles from "./Home.module.css";
import BuildingCard from "./BuildingCard";
import type { Building } from "types";
import { useFetch } from "hooks/useFetch";
import { useEffect, useState } from "react";
import SearchBar from "components/common/SearchBar";
import { API } from "consts";
import { LoadingModal } from "components/common/LoadingModal";

function Home() {
  const [data, loading, error] = useFetch<Building[]>(API.getAllBuildings);
  const [search, setSearch] = useState<string>();

  useEffect(
    () => console.log({ data, loading, error }),
    [data, loading, error]
  );

  return (
    <>
      <Container>
        <div className={styles.searchContainer}>
          <SearchBar onChange={setSearch} keyword={search} />
        </div>
        {error ? (
          <p>{error}</p>
        ) : (
          <div className={styles.buildingContainerGrid}>
            {!loading &&
              data &&
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

      <LoadingModal loading={loading} />
    </>
  );
}

export default Home;
