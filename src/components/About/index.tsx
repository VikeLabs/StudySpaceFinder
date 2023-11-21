import { Link } from "react-router-dom";
import styles from "./about.module.css";
import Container from "components/common/Container";
import { CONTRIBUTORS } from "consts";
import shortid from "shortid";
import { FaGithub } from "react-icons/fa";
import { Anchor } from "components/common/Anchor";
import classNames from "classnames";

function About() {
  return (
    <Container bottomPadding={false}>
      <div className={styles.innerContainer}>
        <section className={classNames(styles.section, styles.firstSection)}>
          <h2>About</h2>
          <p className={styles.p}>
            Study Space Finder makes it easy to find study spaces at the University
            of Victoria!
          </p>
          <br/>
          <p className={styles.p}>
            Study Space Finder is a Vikelabs project that shows where empty classes are on campus.
            You can check a building's classrooms to see which ones are currently not in use,
            or click on an individual classroom to see its schedule for the week.
            Study Space Finder is still in progress, so there may be the occasional bug or slow page load.
          </p>
          <br/>
          <p className={styles.p}>
            Please note that we only have access to the lecture schedules posted by UVic.
            Sometimes lectures are moved, clubs have booked rooms, or other events are happening that we aren't aware of.
          </p>
        </section>

        <section className={styles.section}>
          <h2>VikeLabs</h2>
          <p className={styles.p}>
            Study Space Finder was developed by students at{" "}
            <a href="https://www.vikelabs.ca/" className={styles.link}>VikeLabs</a>, a software
            development club at UVic.
          </p>
          <br/>
          <p className={styles.p}>
            <Anchor href="https://github.com/Scott-Kenning/StudySpaceFinder" className={styles.link}>
              See our GitHub repository
            </Anchor>
          </p>
        </section>

        <section className={styles.section}>
          <h2>Contributors</h2>
          <div className={styles.githubContainer}>

          {CONTRIBUTORS.map(({ name, github }) => (
            <Anchor href={github} aria-label="github" key={shortid.generate()} className={styles.githubCard}>
              <FaGithub />
              &nbsp;
              <span>{name}</span>
            </Anchor>
          ))}
          </div>
        </section>
      </div>
    </Container>
  );
}

export default About;
