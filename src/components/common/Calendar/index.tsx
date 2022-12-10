import type { Dispatch, SetStateAction } from "react";
import _Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface CalendarPropTypes {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

export const Calendar = ({ date, setDate }: CalendarPropTypes) => {
  return (
    <div>
      <_Calendar
        value={date}
        onChange={setDate}
        minDate={new Date()}
        nextAriaLabel="next month"
        next2AriaLabel="next year"
        prevAriaLabel="previous month"
        prev2AriaLabel="previous year"
      />
    </div>
  );
};
