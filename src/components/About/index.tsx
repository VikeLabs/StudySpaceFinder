import React from 'react'
import { Link } from 'react-router-dom'
import styles from './css/about.module.css';
import { PageTitle } from "components/common/PageTitle";
import Container from "components/common/Container";
import Divider from "components/About/Divider";

function About() {
    return (
        <Container>
            <PageTitle name="About"/>
            <Divider>
                <p className={styles.p}>Study Space Finder makes it easy to find study space at the University of Victoria!</p>
                <p className={styles.p}>You can use the <Link to="/">Classrooms</Link> page to find rooms that aren't currently in use.</p>
                <p className={styles.p}>Right now, our data only considers UVic classes. Rooms may be booked for other events.</p>
                <p className={styles.p}><Link to="/" >Click here to look for available classrooms</Link></p>
            </Divider>
            
            <PageTitle name="VikeLabs"/>
            <Divider>
                <p className={styles.p}>Study Space Finder was developed by students at <a href="https://www.vikelabs.ca/">VikeLabs</a>, a software development club at UVic.</p>
                <p className={styles.p}><a href="https://github.com/Scott-Kenning/StudySpaceFinder">See our GitHub repository</a></p>
            </Divider>
            {/* We could include a suggestions section. For example, CourseUp links to github discussions and a google form for feedback. */}
            {/* We could also include credits */}
        
        </Container>
    )
}

export default About