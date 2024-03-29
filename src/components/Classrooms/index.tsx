import { useState } from "react";
import ClassroomCard from "./ClassroomCard";
import { useSearchParams } from "react-router-dom";
import Container from "components/common/Container";
import { PageTitle } from "components/common/PageTitle";
import Dropdown from "components/common/Dropdown";
import { dateOptions, API } from "consts";
import styles from "./Classrooms.module.css";
import { useFetch } from "hooks/useFetch";
import { Classroom, ClassroomSummary } from "types";
import { LoadingModal } from "components/common/LoadingModal";
import { decodeHtmlEntities } from "util/decodeHTML";

function ClassroomCardsContainer(props: any) {
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
  const [hour, minute] = time.split(":");
  const buildingId = params.get("building");

  const urlParam = new URLSearchParams({ hour, minute, day: String(day) });
  const url = `${API.getBuilding}/${buildingId}?${urlParam.toString()}`;
  const [payload, loading, error] = useFetch<any>(url);

  return (
    <>
      <Container>
        <PageTitle name={decodeHtmlEntities(payload?.building?.name || "")} />
        <div className={styles.dropdownContainer}>
          <label>
            Time:
            <input
              type="time"
              min="08:00"
              max="22:00"
              value={time}
              onChange={(e) => setTime(e.target.value ? e.target.value : time)}
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
        ) : loading ? (
          <LoadingModal loading={loading}>
            <></>
          </LoadingModal>
        ) : (
          <div className={styles.ClassroomCardsContainer}>
            {payload?.rooms.map((item: Classroom) => {
              return (
                <ClassroomCard
                  key={item.room_id}
                  building={payload.building.name}
                  room_id={item.id}
                  room={item.room}
                  subject={item.subject}
                  next_class={item.next_class}
                  current_class={item.current_class}
                />
              );
            })}
          </div>
        )}
      </Container>
    </>
  );
}

export default ClassroomCardsContainer;
