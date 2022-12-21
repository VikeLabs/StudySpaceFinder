import styles from "./classrooms.module.css"; 
import React, { useEffect, useState } from 'react'
import ClassroomCards from './classroomsCards';

function ClassroomCardsContainer(input: any){
    console.log(input)
    
    const [data, setData] = useState([] as any[]);
    useEffect(() => {
        setData(input);
    }, [])


    if (data== null){

    return(
        <div>Loading... </div>
    )
    }
    // map data to ClassroomCards - this is placeholder
    return(
        <div>
        <ClassroomCards>{data}</ClassroomCards>
        <ClassroomCards>{data}</ClassroomCards>
        <ClassroomCards>{data}</ClassroomCards>
        <ClassroomCards>{data}</ClassroomCards>
        <ClassroomCards>{data}</ClassroomCards>
        </div>
    );
    }
    


export default ClassroomCardsContainer