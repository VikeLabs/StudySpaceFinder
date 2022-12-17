import React, { useEffect, useState } from 'react'
import props from 'react'
import { Link } from 'react-router-dom'
import { mockFetch } from "mock";
import styles from "./classrooms.module.css"; 

function ClassroomCards (input: any){
    
    const [data, setData] = useState([] as any[]);
    useEffect(() => {
        setData(input);
    }, [])

// {data.seatingCapacity in that span - is not working}
    
    return(
        <div className={styles.cardOuter}>
            <div className={styles.cardInner}>
                <h1 className={styles.cardTitle}>A150</h1>
                <span className={styles.cardText}> Seating Capacity:</span>
            </div>
        </div>
    );
    
}

export default ClassroomCards