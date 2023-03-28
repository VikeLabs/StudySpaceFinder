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
    
    
    //TODO: need to set data from backend api
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


/*
    //Loop through monday until we get a false answer, then create event over that time range.
    //then loop through until we get a true, create event.
    //do it for every day, filling events

    //function to help string organization for registering calendar events - Got some issues, would need to be updated every semester right now
    // function getTimeByIndex (index, day) {
    //     const dayToDateMap = new Map([["Monday","2023-01-09T"],["Tuesday","2023-01-10T"],["Wednesday","2023-01-11T"],["Thursday","2023-01-12T"],["Friday","2023-01-13T"]])
    //     let dayString = dayToDateMap.get(day);
    //     let hour = 8;
    //     let minute = 0;

    //     hour = Math.floor(hour + index/2);
    //     minute = (index*30)%60
    //     if(minute === 0) {
    //         minute = "00";
    //     }
    //     if(hour < 10) {
    //         hour = "0" + hour;
    //     }
    //     return dayString + hour + ":" + minute + ":" + "00";
    // }

    

    if (Object.keys(data).length !== 0) {  //This checks whether a classroom has no data, and although I haven't found a class like this, it's necesarry
        
        let daysIncluded = Object.keys(data.times);

        daysIncluded.forEach(day => { //for each day of the week, create a set availability events
            let lastTime = getTimeByIndex(0, day);
            let currentTime = lastTime;
            let lookingFor = false;

            //For through array for each day
            //look for false
            //create event from lastTime to currentTime
            //Set currentTime to lastTime
            //look for true
            //create event from lastTime to currentTime
            //Set currentTime to lastTime

            for (let index = 0; index < data.times[day].length; index++) {
                const element = data.times[day][index];

                if(index === 0) { //Set the first value of lookingFor
                    lookingFor = !element;
                }


                if(element === false && lookingFor === false) {
                    currentTime = getTimeByIndex(index, day);
                    calendarEvents.push({
                        text: "Available",
                        start: lastTime,
                        end: currentTime,
                        barColor: "#6aa84f",
                        id: DayPilot.guid(),
                    })
                    lastTime = currentTime;
                    lookingFor = true;
                }


                if(element === true && lookingFor === true) {
                    currentTime = getTimeByIndex(index, day);
                    calendarEvents.push({
                        text: "Unavailable",
                        start: lastTime,
                        end: currentTime,
                        barColor: "#cc5555",
                        id: DayPilot.guid(),
                    })
                    lastTime = currentTime;
                    lookingFor = false;
                }

                if(index === data.times[day].length - 1) { //Handle the final event of the day
                    if(lookingFor === true) {
                        currentTime = getTimeByIndex(index + 1, day);
                        calendarEvents.push({
                            text: "Unavailable",
                            start: lastTime,
                            end: currentTime,
                            barColor: "#cc5555",
                            id: DayPilot.guid(),
                        })
                    }
                    if(lookingFor === false) {
                        currentTime = getTimeByIndex(index + 1, day);
                        calendarEvents.push({
                            text: "Available",
                            start: lastTime,
                            end: currentTime,
                            barColor: "#6aa84f",
                            id: DayPilot.guid(),
                        })
                    }
                }

                //TODO: 
                //Decrease the time range to only university hours -- requires pro version
            }
        });
    }
*/

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

//TODO:
//Style the calendar (there is an online theme maker?)
//Make a single day-column for mobile?