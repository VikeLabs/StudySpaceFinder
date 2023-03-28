import React, { useEffect, useState } from 'react';
import {DayPilot, DayPilotCalendar} from "@daypilot/daypilot-lite-react";
import { useSearchParams } from "react-router-dom";
import Container from 'components/common/Container';
import { PageTitle } from 'components/common/PageTitle';
import { useFetch } from "hooks/useFetch";
import './calendar.css'

function RoomCalendar (props){
    const [params, setparams] = useSearchParams();
    const [building, setBuilding] = useState(params.get('building'))
    const [roomId, setRoomId] = useState(params.get('room'))
    const [data, loading, error] = useFetch(`/room/${roomId}`);

    let calendarEvents = [];
    //for each key in data
    //for each element of each key's array
    //add event to the calendar for that day
    if(data) {
        let daysIncluded = Object.keys(data.schedules);
        daysIncluded.forEach(day => {
            data.schedules[day].forEach(scheduledClass => {
                console.log(scheduledClass);
                calendarEvents.push(createCalendarEvent(scheduledClass.time_start, scheduledClass.time_end, scheduledClass.subject, day))
            })
        })
    }

    function createCalendarEvent (startTime, endTime, name, day) {
        let calendarEvent = {
            text: name,
            start: formatTime(startTime, day),
            end: formatTime(endTime, day),
            barColor: "#6aa84f",
            id: DayPilot.guid()
        }
        return calendarEvent;
    }
    
    function formatTime (time, day) {
        const dayToDateMap = new Map([["Monday","January 9, 2023 "],["Tuesday","January 10, 2023 "],["Wednesday","January 11, 2023 "],["Thursday","January 12, 2023 "],["Friday","January 13, 2023 "],["Saturday","January 14, 2023 "],["Sunday","January 15, 2023 "]])
        let dayString = dayToDateMap.get(day);
        let ftime = new Date(dayString + time + " UTC"); 
        //NOTE: the calendar shifts the time if it's not given in UTC, so I just stuck it on the end
        //This is potentially gimmicky, the calendar might not be showing the actual timezone
        //Shouldn't be an issue unless we want to display to other timezones, 
        //or maybe daylight savings could throw it off
        return ftime;
    }

    let calendarSettings = {
        viewType: "WorkWeek",
        headerDateFormat: "dddd",
        events: calendarEvents,
        startDate: "2023-01-09",
        //The calendar alawys displays Jan 9th to Jan 13th, 2023
        //but as long as the data passed in is for the right semester, 
        //it shouldn't cause any problems.
        eventMoveHandling: "Disabled",
        dayBeginsHour: "8", //this apparently requires pro version
        scrollPositionHour: "8",
        theme: "calendar"
    };


    return loading ? (
        <p>Loading...</p>
        ) : error ? <p>{error}</p> : (
        <Container>
            <PageTitle name={data ? data.building + " " + data.room : ""}/>
            <div className="calendarContainer">
                <DayPilotCalendar
                    {...calendarSettings}
                />
            </div>
            <div className='legend'>
                <div className='unavailableColour'></div>
                <p className='legendText'>Unavailable</p>
            </div>
        </Container>
    );
    
}

export default RoomCalendar