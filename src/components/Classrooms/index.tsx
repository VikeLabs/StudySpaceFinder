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


interface fetchResponseType {
  data: unknown;
  loading: Boolean;
  error: string;
};

function ClassroomCardsContainer(input: any) {
  const getCurrentDate = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${hours}:${minutes}`;
  };

  const [time, setTime] = useState(getCurrentDate());
  const [day, setDay] = useState(new Date().getDay());
  const [params, setparams] = useSearchParams();
  const [building, setBuilding] = useState(params.get("building"));
  const [data, loading, error] = useFetch<any>(`/building/${building}?hour=${time.split(":")[0]}&minute=${time.split(":")[1]}&day=${day}`);

  console.log(data)

  const handleDayChange = (event: any) => {
    console.log(event.target.value);
    setDay(event.target.value);
  };

  return loading ? (
    <p>Loading...</p>
  ) : error ? <p>{error}</p> : (
    <Container>
      <PageTitle name={data ? data.building : ""} />
      <div className={styles.dropdownContainer}>
        <input type="time" min="08:00" max="22:00" value={time} onChange={(e) => setTime(e.target.value)}/>
        <Dropdown
          label="Day"
          value={day}
          options={dateOptions}
          onChange={handleDayChange}
        />
      </div>
      <div className={styles.ClassroomCardsContainer}>
        {data && data.data.map((item: any) => {
          return <ClassroomCard name={item.room} freeUntil={item.next_class}/>
        })}
      </div>
    </Container>
  );
}

export default ClassroomCardsContainer;
