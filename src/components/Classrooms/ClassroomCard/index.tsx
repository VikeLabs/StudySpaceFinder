import React, { useEffect, useState } from 'react'
import props from 'react'
import { Link } from 'react-router-dom'
import { mockFetch } from "mock";
import styles from "./classrooms.module.css"; 

function ClassroomCards (props: any){
    
    const [data, setData] = useState([] as any[]);
    useEffect(() => {
        setData(props);
    }, [])

// {data.seatingCapacity in that span - is not working}
    
    return(
        <Link to={`calendar?building=${props.building}&classroom=${props.name}`}>
            <div className={styles.cardOuter}>
            
                <div className={styles.cardInner}>
                    <h1 className={styles.cardTitle}>{props.name}</h1>
                    
                        {/* <RoomCalendar times={props.classroom}/> */}
                    
                    {/* <span className={styles.cardText}>Seating Capacity: {props.classroom.seatingCapacity}</span> */}
                </div>
            </div>
        </Link>
    );
    
}

export default ClassroomCards