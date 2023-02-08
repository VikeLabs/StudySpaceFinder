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
import { useFetch } from "hooks/useFetch";
import { BuildingData } from "types";

function ClassroomCardsContainer(input: any) {
  const [params] = useSearchParams();
  const [building] = useState(params.get("building"));
  const [data, isLoading, error] = useFetch<BuildingData>(
    `/${encodeURI(building)}`
  );

  const [timeValue, setTimeValue] = useState(getCurrentTimeIndex());
  const [dayValue, setDayValue] = useState(getCurrentDay());

  useEffect(() => {
    console.log(data);
  }, [data]);

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

  return isLoading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>error</p>
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
        {data && // this part broke bruhhhhhh
          Object.keys(data).map((key: any, index: number) => {
            return isClassAvailable(building, key) ? (
              <ClassroomCard
                name={key}
                data={key}
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
