import { Classroom } from "types";
import styles from "./classrooms.module.css";
import { Link } from 'react-router-dom';

function ClassroomCards({ room_id, room, subject, next_class }: Classroom) {
  return (
    <Link className={styles.link} to={`calendar?building=${room_id}&room=${room}`}>
      <section className={styles.cardContainer}>
        <h1 className={styles.cardTitle}>{room}</h1>

        <p className={styles.cardDesc}>
          {next_class ? (
            <>
              {subject} at {next_class}
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
