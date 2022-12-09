import React from 'react'
import { Link } from 'react-router-dom'
import styles from './css/about.module.css';

function About() {
    return (
        <div className={styles.div}>
            <h1 className={styles.h1}>This is the about page</h1>
            <Link to="/">Click to view our home page</Link>
        </div>
    )
}

export default About