import { Classroom } from "types";
import styles from "./classrooms.module.css";
import { Link } from "react-router-dom";

interface PropType {
  room_id: number;
  room: string;
  next_class: any;
  subject: string;
  building: string; // building name
  current_class: string;
}

function ClassroomCards(props: PropType) {
  console.log(props);
  return (
    <Link
      className={styles.link}
      to={`calendar?roomid=${props.room_id}&building=${props.building}&room=${props.room}`}
    >
      <section className={styles.cardContainer}>
        <h1 className={styles.cardTitle}>{props.room}</h1>

        <p className={styles.cardDesc}>
          {props.current_class ? (
            <>Currently busy</>
          ) : props.next_class ? (
            <>
              {props.next_class.subject} at {props.next_class.time_start}
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
