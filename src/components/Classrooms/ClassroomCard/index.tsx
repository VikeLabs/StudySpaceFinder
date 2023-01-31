import props from 'react'
import styles from "./classrooms.module.css"; 

function ClassroomCards (props: any){
    let i = props.time;
    let timeAvailable = 0;
    while(i <= 27 && (!props.data[props.day] || props.data[props.day][i])) {
        timeAvailable += 0.5;
        i++;
    }    

    return(
        <div className={styles.cardOuter}>
            <div className={styles.cardInner}>
                <h1 className={styles.cardTitle}>{props.name}</h1>
                <p>Hours available: {timeAvailable}</p>
            </div>
        </div>
    );
    
}

export default ClassroomCards