import React, { useEffect, useState } from 'react';
import {DayPilot, DayPilotCalendar} from "@daypilot/daypilot-lite-react";
import { useSearchParams } from "react-router-dom";
import Container from 'components/common/Container';
import { PageTitle } from 'components/common/PageTitle';


function RoomCalendar (props){


    const [params, setparams] = useSearchParams();
    const [building, setBuilding] = useState(params.get('building'))
    const [room, setRoom] = useState(params.get('classroom'))
    
    //TODO: need to set data from backend api
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(props);
    }, [])

    let calendarEvents = [];
    //Loop through monday until we get a false answer, then create event over that time range.
    //then loop through until we get a true, create event.
    //do it for every day, filling events

    //function to help string organization for registering calendar events - Got some issues, would need to be updated every semester right now
    function getTimeByIndex (index, day) {
        const dayToDateMap = new Map([["Monday","2023-01-09T"],["Tuesday","2023-01-10T"],["Wednesday","2023-01-11T"],["Thursday","2023-01-12T"],["Friday","2023-01-13T"]])
        let dayString = dayToDateMap.get(day);
        let hour = 8;
        let minute = 0;

        hour = Math.floor(hour + index/2);
        minute = (index*30)%60
        if(minute === 0) {
            minute = "00";
        }
        if(hour < 10) {
            hour = "0" + hour;
        }
        return dayString + hour + ":" + minute + ":" + "00";
    }

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


    let calendarSettings = {
        viewType: "WorkWeek",
        headerDateFormat: "dddd",
        events: calendarEvents,
        startDate: "2023-01-09",    //would need to be updated every semester
        eventMoveHandling: "Disabled",
        dayBeginsHour: "8",
        scrollPositionHour: "8"
    };


    return(
        <Container>
            <PageTitle name={room}/>
            <DayPilotCalendar
                {...calendarSettings}
            />
        </Container>
    );
    
}

export default RoomCalendar

//TODO:
//Style the calendar (there is an online theme maker?)