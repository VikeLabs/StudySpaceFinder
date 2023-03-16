import props from 'react'
import styles from "./classrooms.module.css"; 

function ClassroomCards (props: any){
    return(
        <div className={styles.cardOuter}>
            <div className={styles.cardInner}>
                <h1 className={styles.cardTitle}>{props.name}</h1>
                <p>Free until: {props.freeUntil}</p>
            </div>
        </div>
    );
    
}

export default ClassroomCards