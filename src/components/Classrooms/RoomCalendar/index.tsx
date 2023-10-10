import { useState } from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import { useSearchParams } from "react-router-dom";
import Container from "components/common/Container";
import { PageTitle } from "components/common/PageTitle";
import { useFetch } from "hooks/useFetch";
import { API } from "consts";
import { decodeHtmlEntities } from "util/decodeHTML";
import "./calendar.css";
import { decode } from "punycode";
import { LoadingModal } from "components/common/LoadingModal";

interface ScheduledClass {
  time_start: string;
  time_end: string;
  subject: string;
}

interface CalendarData {
  [key: string]: ScheduledClass[] | undefined;
}

const RoomCalendar: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const [room, setRoom] = useState<string | null>(params.get("room"));
  const [roomId, setRoomId] = useState<string | null>(params.get("roomid"));
  const [building, setBuilding] = useState<string | null>(
    params.get("building")
  );
  const url = `${API.getRoom}/${roomId}`;
  const [data, loading, error] = useFetch<CalendarData | null>(url);

  let calendarEvents: any[] = [];
  if (data) {
    let daysIncluded = Object.keys(data);
    daysIncluded.forEach((day) => {
      data[day]?.forEach((scheduledClass: ScheduledClass) => {
        calendarEvents.push(
          createCalendarEvent(
            scheduledClass.time_start,
            scheduledClass.time_end,
            scheduledClass.subject,
            day
          )
        );
      });
    });
  }

  function createCalendarEvent(
    startTime: string,
    endTime: string,
    name: string,
    day: string
  ): any {
    let calendarEvent: any = {
      text: name,
      start: formatTime(startTime, day),
      end: formatTime(endTime, day),
      barColor: "#6aa84f",
      id: DayPilot.guid(),
    };
    return calendarEvent;
  }

  function formatTime(time: string, day: string): Date {
    const dayToDateMap = new Map([
      ["Monday", "January 9, 2023 "],
      ["Tuesday", "January 10, 2023 "],
      ["Wednesday", "January 11, 2023 "],
      ["Thursday", "January 12, 2023 "],
      ["Friday", "January 13, 2023 "],
      ["Saturday", "January 14, 2023 "],
      ["Sunday", "January 15, 2023 "],
    ]);
    let dayString = dayToDateMap.get(day);
    let ftime = new Date(dayString + time + " UTC");
    return ftime;
  }

  let calendarSettings: any = {
    viewType: "WorkWeek",
    headerDateFormat: "dddd",
    events: calendarEvents,
    startDate: "2023-01-09",
    eventMoveHandling: "Disabled",
    eventResizeHandling: "Disabled",
    eventEditHandling: "Disabled",
    timeRangeSelectedHandling: "Disabled",
    dayBeginsHour: 8,
    scrollPositionHour: 8,
    theme: "calendar_default",
  };

  if (loading) return (
    <LoadingModal loading={loading}>
      <></>
    </LoadingModal>
  );
  if (error) return <p>{error}</p>;
  return (
    <Container>
      <PageTitle
        name={data ? decodeHtmlEntities(decodeURI(building)) + " " + room + " Weekly Schedule" : ""}
      />
      <div className="calendarContainer">
        <DayPilotCalendar {...calendarSettings} />
      </div>
      <div className="legend">
        <div className="unavailableColour"></div>
        <p className="legendText">Unavailable</p>
      </div>
    </Container>
  );
};

export default RoomCalendar;
