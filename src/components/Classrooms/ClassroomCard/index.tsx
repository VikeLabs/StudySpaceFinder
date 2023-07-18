import { Classroom } from "types";
import styles from "./classrooms.module.css";

function ClassroomCards({ room_id, room, subject, next_class }: Classroom) {
  return (
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
  );
}

export default ClassroomCards;
