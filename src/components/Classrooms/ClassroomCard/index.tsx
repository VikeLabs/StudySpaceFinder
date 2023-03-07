import props from 'react'
import styles from "./classrooms.module.css"; 
import { Link } from 'react-router-dom'

function ClassroomCards (props: any){
    return(
        <Link to={`calendar?building=${props.building}&classroom=${props.name}`}>
            <div className={styles.cardOuter}>
                <div className={styles.cardInner}>
                    <h1 className={styles.cardTitle}>{props.name}</h1>
                    <p>Free until: {props.freeUntil}</p>
                </div>
            </div>
        </Link>
    );
    
}

export default ClassroomCards