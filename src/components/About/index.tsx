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
          Study Space Finder makes it easy to find study spaces at the University
          of Victoria!
        </p>
        <p className={styles.p}>
          You can use the link <Link to="/" className={styles.link}>here</Link> to find rooms that
          aren't currently in use.
        </p>
        <p className={styles.p}>
          Right now, our data only considers UVic classes. Rooms may be booked
          for other that we aren't aware of such as club meetings or guest lectures.
        </p>
      </section>

      <section className={styles.section}>
        <h2>VikeLabs</h2>
        <p className={styles.p}>
          Study Space Finder was developed by students at{" "}
          <a href="https://www.vikelabs.ca/" className={styles.link}>VikeLabs</a>, a software
          development club at UVic.
        </p>
        <p className={styles.p}>
          <Anchor href="https://github.com/Scott-Kenning/StudySpaceFinder" className={styles.link}>
            See our GitHub repository
          </Anchor>
        </p>
      </section>
      {/* We could include a suggestions section. For example, CourseUp links to github discussions and a google form for feedback. */}

      <section className={styles.section}>
        <h2>Disclaimer</h2>
        {/* {DISCLAIMER.split("\n").map((p) => (
          <p key={shortid.generate()} className={styles.p}>
            {p}
          </p>
        ))} */}
        <p>
        Study Space Finder is an interface developed by students of University of Victoria (UVic). 
        </p>
        <p>
          Please note that the information provided on this platform is based on the information found in UVic websites. However, we remain independent and there may be certain information that we do not have access to. Therefore, we cannot guarantee the accuracy, completeness, or reliability of the information provided. We strongly recommend that users verify any information obtained from this website with official sources before making any decisions or taking any actions based on such information.
        </p>
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
          <Anchor href={SOURCE.client} className={styles.link}>open source</Anchor>!
        </h3>
        <p>
          If you are interested in consuming the API, read the&nbsp;
          <Anchor href={SOURCE.api} className={styles.link}>docs</Anchor>.
        </p>
      </section>
    </Container>
  );
}

export default About;
