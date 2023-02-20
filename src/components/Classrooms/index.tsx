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
import { timeOptions, dateOptions } from "consts.js";
import styles from "./Classrooms.module.css";

import { useFetch } from "hooks";

function ClassroomCardsContainer(input: any) {
  const [params, setparams] = useSearchParams();
  const [building, setBuilding] = useState(params.get("building"));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeValue, setTimeValue] = useState(getCurrentTimeIndex());
  const [dayValue, setDayValue] = useState(getCurrentDay());

  const buildingId = params.get("building");
  const s = useFetch(`/building/${buildingId}?hour=10&minute=10&day=3`); // TODO: new Date().getHours(), .getMinutes(), getDay()(?)
  console.log(s);

  useEffect(() => {
    console.log(params.get("building"), setparams);
    mockFetch("resolve", 100)
      .then((response) => response.json())
      .then((data) => setData(data[building]))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  const handleTimeChange = (event: any) => {
    setTimeValue(event.target.value);
  };

  const handleDayChange = (event: any) => {
    setDayValue(event.target.value);
  };

  const isClassAvailable = (building: string, classroom: string) => {
    let room = (times as any)[building][classroom];
    if (!room[dayValue]) return true;
    return room[dayValue][timeValue];
  };

  return loading ? (
    <p>Loading...</p>
  ) : (
    <Container>
      <PageTitle name={building} />
      <div className={styles.dropdownContainer}>
        <Dropdown
          label="Time"
          value={timeValue}
          options={timeOptions}
          onChange={handleTimeChange}
        />
        <Dropdown
          label="Day"
          value={dayValue}
          options={dateOptions}
          onChange={handleDayChange}
        />
      </div>
      <div className={styles.ClassroomCardsContainer}>
        {data &&
          Object.keys(data).map((key: any, index: number) => {
            return isClassAvailable(building, key) ? (
              <ClassroomCard
                name={key}
                data={data[key]}
                day={dayValue}
                time={timeValue}
                key={index}
              />
            ) : null;
          })}
      </div>
    </Container>
  );
}

export default ClassroomCardsContainer;
