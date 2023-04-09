import { Link } from "react-router-dom";
import styles from "./css/about.module.css";
import Container from "components/common/Container";
import { CONTRIBUTORS, DISCLAIMER, SOURCE } from "consts";
import shortid from "shortid";
import { FaGithub } from "react-icons/fa";
import { Anchor } from "components/common/Anchor";
import classNames from "classnames";

function About() {
  return (
    <Container>
      <section className={classNames(styles.section, styles.firstSection)}>
        <h2>About</h2>
        <p className={styles.p}>
          Study Space Finder makes it easy to find study space at the University
          of Victoria!
        </p>
        <p className={styles.p}>
          You can use the <Link to="/">Classrooms</Link> page to find rooms that
          aren't currently in use.
        </p>
        <p className={styles.p}>
          Right now, our data only considers UVic classes. Rooms may be booked
          for other events.
        </p>
        <p className={styles.p}>
          <Link to="/">Click here to look for available classrooms</Link>
        </p>
      </section>

      <section className={styles.section}>
        <h2>VikeLabs</h2>
        <p className={styles.p}>
          Study Space Finder was developed by students at{" "}
          <a href="https://www.vikelabs.ca/">VikeLabs</a>, a software
          development club at UVic.
        </p>
        <p className={styles.p}>
          <Anchor href="https://github.com/Scott-Kenning/StudySpaceFinder">
            See our GitHub repository
          </Anchor>
        </p>
      </section>
      {/* We could include a suggestions section. For example, CourseUp links to github discussions and a google form for feedback. */}

      <section className={styles.section}>
        <h2>Disclaimer</h2>
        {DISCLAIMER.split("\n").map((p) => (
          <p key={shortid.generate()} className={styles.p}>
            {p}
          </p>
        ))}
      </section>

      <section className={styles.section}>
        <h2>Contributors</h2>
        {CONTRIBUTORS.map(({ name, github }) => (
          <Anchor href={github} aria-label="github" key={shortid.generate()}>
            <FaGithub />
            &nbsp;
            <span>{name}</span>
          </Anchor>
        ))}
      </section>

      <section className={styles.section}>
        <h3>
          Study Space Finder is&nbsp;
          <Anchor href={SOURCE.client}>open source</Anchor>!
        </h3>
        <p>
          If you are interested in consuming the API, read the&nbsp;
          <Anchor href={SOURCE.api}>docs</Anchor>.
        </p>
      </section>
    </Container>
  );
}

export default About;
