import { Classroom } from "types";
import styles from "./classrooms.module.css";
import { Link } from 'react-router-dom';

interface PropType {
  room_id: number
  room: string
  next_class: string
  subject: string
  building: string; // building name
}

function ClassroomCards(props : PropType) {
  return (
    <Link className={styles.link} to={`calendar?roomid=${props.room_id}&building=${props.building}&room=${props.room}`}>
      <section className={styles.cardContainer}>
        <h1 className={styles.cardTitle}>{props.room}</h1>

        <p className={styles.cardDesc}>
          {props.next_class ? (
            <>
              {props.subject} at {props.next_class}
            </>
          ) : (
            <>Free until end of day</>
          )}
        </p>
      </section>
    </Link>
  );
}

export default ClassroomCards;
