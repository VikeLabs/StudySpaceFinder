import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <NavLink className={styles.navLink} to="/">
        <h1 className={styles.title} />
      </NavLink>
      <NavLink to="about" className={styles.navLink}>About</NavLink>
    </nav>
  );
};

export default Nav;
