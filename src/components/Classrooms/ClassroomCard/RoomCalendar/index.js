import React, { useEffect, useState } from 'react'
import {Component} from 'react'
import props from 'react'
import { Link } from 'react-router-dom'
import { mockFetch } from "mock";
import {DayPilot, DayPilotCalendar} from "@daypilot/daypilot-lite-react";


function RoomCalendar (props){
    
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(props);
    }, [])

    //let calendarEvents = [];
    //Loop through monday until we get a false answer, then create event over that time range.
    //then loop through until we get a true, create event.
    //do it for every day, filling events

    // props.times.forEach(element => {
        
    // });



    let calendarSettings = {
        viewType: "WorkWeek",
        // headerDateFormat: "dddd",
        // events: [
        //         {
        //             id: 1,
        //             text: "Event 1",
        //             start: "2023-01-12T10:30:00",
        //             end: "2023-01-12T13:00:00"
        //         },
        //         {
        //             id: 2,
        //             text: "Event 2",
        //             start: "2023-01-12T09:30:00",
        //             end: "2023-01-13T11:30:00",
        //             barColor: "#6aa84f"
        //         },
        //     ]
        
    };

    let sum = props.times.length;
    // for (let index = 0; index < props.times.Monday.length; index++) {
    //     // const available = props.Monday[index];
    //     // if(available === true) {
    //     //     sum++;
    //     // }
    // }
    
    return(
        // <DayPilotCalendar
        //     {...calendarSettings}
        // />
        <p>{sum}</p>
    );
    
}

export default RoomCalendar

    //Figure out how to display names of days of the week (Monday, Tuesday, ...)
    //Figure out how to add events to the calendar
//Populate calendars // Switch to the new data set
//Make it so the calendar only appears when the classroom card is clicked
//Style the calendar (there is an online theme maker?)