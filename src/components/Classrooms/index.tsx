import { useEffect, useState } from "react";
import ClassroomCard from "./ClassroomCard";
import { useSearchParams } from "react-router-dom";
import { mockFetch } from "mock";
import Container from "components/common/Container";
import { PageTitle } from "components/common/PageTitle";
import times from "mock/building_time_intervals_0.1.json";
import Dropdown from "components/common/Dropdown";
import { getCurrentTimeIndex } from "util/getCurrentTimeIndex";
import { getCurrentDay } from "util/getCurrentDay";
import { dateOptions } from "consts.js";
import styles from "./Classrooms.module.css";
import { useFetch } from "hooks/useFetch";

function ClassroomCardsContainer(input: any) {
  const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${hours}:${minutes}`;
  };

  const [time, setTime] = useState(getCurrentTime());
  const [day, setDay] = useState(new Date().getDay());
  const [params, setparams] = useSearchParams();
  const [building, setBuilding] = useState(params.get("building"));
  const [data, loading, error] = useFetch<any>(`/building/${building}?hour=${time.split(":")[0]}&minute=${time.split(":")[1]}&day=${day}`);

  return (
    <Container>
      <PageTitle name={data ? data.building : "..."} />
      <div className={styles.dropdownContainer}>
        <label>
          Time:
          <input type="time" min="08:00" max="22:00" value={time} onChange={(e) => setTime(e.target.value)}/>
        </label>
        <Dropdown
          label="Day"
          value={day}
          options={dateOptions}
          onChange={(e: any) => setDay(e.target.value)}
        />
      </div>
      {loading ?
        <p>Loading...</p> : 
        error ? <p>{error}</p> :
          <div className={styles.ClassroomCardsContainer}>
            {data && data.data.map((item: any) => {
              return <ClassroomCard name={item.room} freeUntil={item.next_class} key={item.room_id}/>
            })}
          </div>
        }
    </Container>
  );
}

export default ClassroomCardsContainer;
