import React, { useEffect } from 'react'
import { useState } from 'react';
import props from 'react'
import { Link } from 'react-router-dom'
import { mockFetch } from "mock";
import styles from "./classrooms.module.css"; 
import ClassroomCards from './classroomsCards';
import ClassroomCardsContainer from './classroomCardsContainer';

function Classrooms() {
    let building = "Bob Wright"; //placeholder - page would be loaded with building selection passed in 
    const [data, setData] = useState(null);
    
    useEffect(() => {
        mockFetch("resolve")
          .then((response) => response.json())
          .then((buildings) => {
            console.log(buildings);
            setData(buildings[building]);
            console.log(data);
          })
          .catch((e) => console.log(e));
      }, []);
      

    return (
        <div className={styles.pageHeader}>
            <h1>Classrooms</h1>
            <ClassroomCardsContainer>{data}</ClassroomCardsContainer>
        </div>
    )
}

export default Classrooms