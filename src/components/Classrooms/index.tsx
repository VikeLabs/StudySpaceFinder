import { useState } from "react";
import ClassroomCard from "./ClassroomCard";
import { useSearchParams } from "react-router-dom";
import Container from "components/common/Container";
import { PageTitle } from "components/common/PageTitle";
import Dropdown from "components/common/Dropdown";
import { dateOptions, ENDPOINTS } from "consts";
import styles from "./Classrooms.module.css";
import { useFetch } from "hooks/useFetch";
import { Classroom, ClassroomSummary } from "types";
import { LoadingModal } from "components/common/LoadingModal";

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
  const [payload, loading, error] = useFetch<ClassroomSummary>(
    `${ENDPOINTS.getBuilding}/${buildingId}?hour=${time.split(":")[0]}&minute=${
      time.split(":")[1]
    }&day=${day}`
  );

  return (
    <>
      <Container>
        <PageTitle name={payload ? payload.building : "..."} />
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
        {error ? (
          <p>{error}</p>
        ) : (
          <div className={styles.ClassroomCardsContainer}>
            {payload &&
              payload.data.map((item: Classroom) => {
                return <ClassroomCard key={item.room_id} {...item} />;
              })}
          </div>
        )}
      </Container>
      <LoadingModal loading={loading} />
    </>
  );
}

export default ClassroomCardsContainer;
