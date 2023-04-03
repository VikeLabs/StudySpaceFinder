import { useState } from "react";
import ClassroomCard from "./ClassroomCard";
import { useSearchParams } from "react-router-dom";
import Container from "components/common/Container";
import { PageTitle } from "components/common/PageTitle";
import Dropdown from "components/common/Dropdown";
import { dateOptions, ENDPOINTS } from "consts";
import styles from "./Classrooms.module.css";
import { useFetch } from "hooks/useFetch";

function ClassroomCardsContainer() {
  const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${hours}:${minutes}`;
  };

  const [time, setTime] = useState(getCurrentTime());
  const [day, setDay] = useState(new Date().getDay());
  const [params] = useSearchParams();

  const buildingId = params.get("building");
  const [data, loading, error] = useFetch<any>(
    `${ENDPOINTS.getBuilding}/${buildingId}?hour=${time.split(":")[0]}&minute=${
      time.split(":")[1]
    }&day=${day}`
  );

  return (
    <Container>
      <PageTitle name={data ? data.building : "..."} />
      <div className={styles.dropdownContainer}>
        <label>
          Time:
          <input
            type="time"
            min="08:00"
            max="22:00"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
        <Dropdown
          label="Day"
          value={day}
          options={dateOptions}
          onChange={(e: any) => setDay(e.target.value)}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className={styles.ClassroomCardsContainer}>
          {data &&
            data.data.map((item: any) => {
              return (
                <ClassroomCard
                  name={item.room}
                  freeUntil={item.next_class}
                  key={item.room_id}
                />
              );
            })}
        </div>
      )}
    </Container>
  );
}

export default ClassroomCardsContainer;
