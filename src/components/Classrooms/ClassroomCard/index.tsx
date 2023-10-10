import { Classroom } from "types";
import styles from "./classrooms.module.css";
import { Link } from "react-router-dom";

interface PropType {
  room_id: number;
  room: string;
  next_class: any;
  subject: string;
  building: string;
  current_class: string;
}

function ClassroomCards(props: PropType) {
  return (
    <Link
      className={styles.link}
      to={`calendar?roomid=${props.room_id}&building=${encodeURIComponent(props.building)}&room=${props.room}`}
    >
      <section className={styles.cardContainer}>
        <h1 className={styles.cardTitle}>{props.room}</h1>

        <p className={styles.cardDesc}>
          {props.current_class ? (
            <>Currently busy</>
          ) : props.next_class ? (
            <>
              Free until {props.next_class.time_start}
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
