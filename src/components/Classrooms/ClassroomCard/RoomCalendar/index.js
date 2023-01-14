import React, { useEffect, useState } from 'react'
import {DayPilot, DayPilotCalendar} from "@daypilot/daypilot-lite-react";


function RoomCalendar (props){
    
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(props);
    }, [])

    let calendarEvents = [
        // {
        //     text: "test",
        //     start: "2023-01-11T08:30:00",
        //     end: "2023-01-11T10:30:00",
        //     id: DayPilot.guid(),
        // }
    ];
    //Loop through monday until we get a false answer, then create event over that time range.
    //then loop through until we get a true, create event.
    //do it for every day, filling events

    //function to help string organization for registering calendar events
    function getTimeByIndex (index, day) {
        const dayToDateMap = new Map([["Monday","2023-01-09T"],["Tuesday","2023-01-10T"],["Wednesday","2023-01-11T"],["Thursday","2023-01-12T"],["Friday","2023-01-13T"]])
        let dayString = dayToDateMap.get(day);
        let hour = 8;
        let minute = 30;
        let startTime = index*30
        hour = Math.floor(hour + index/2);
        minute = (30+index*30)%60
        if(minute === 0) {
            hour++;
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

            //For through length of monday
            //look for false
            //create event from lastTime to currentTime
            //Set currentTime to lastTime
            //look for true
            //create event from lastTime to currentTime
            //Set currentTime to lastTime

            console.log("Classoom: " + data)
            for (let index = 0; index < props.times[day].length; index++) {
                const element = props.times[day][index];
                console.log("Element is: " + element)
                console.log("Looking for: " + lookingFor)

                if(index === 0) { //Set the first value of lookingFor
                    lookingFor = !element;
                }


                if(element === false && lookingFor === false) {
                    console.log("newEntry Available")
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
                    console.log("newEntry unavailable")
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

                if(index === props.times[day].length - 1) { //Handle the final event of the day
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

                    //Todo: Add last event
                    //Make the first event make sense
                    //Make it log for every thursday this semester -- update, no need, but the dates will need to be changed each semester
                    //Make it log for every day
                //Make the events unmovable
                //Decrease the time range to only university hours
            }
        });
    }


    let calendarSettings = {
        viewType: "WorkWeek",
        headerDateFormat: "dddd",
        events: calendarEvents,
        
    };

    // let sum = 0;
    // let sums = ["Control"];
    // for (let index = 0; index < props.times.Monday.length; index++) {
    //     // const available = props.Monday[index];
    //     // if(available === true) {
    //     //     sum++;
    //     // }
    // }

    return(
        <DayPilotCalendar
            {...calendarSettings}
        />
        // <p>{getTimeByIndex(0, "Monday")}</p>
    );
    
}

export default RoomCalendar

    //Figure out how to display names of days of the week (Monday, Tuesday, ...)
    //Figure out how to add events to the calendar
//Populate calendars // Switch to the new data set
//Make it so the calendar only appears when the classroom card is clicked
//Style the calendar (there is an online theme maker?)