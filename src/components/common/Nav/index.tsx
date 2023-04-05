import { NavLink } from "react-router-dom";
import style from "./Nav.module.css";

const Nav = () => {
  return (
    <nav className={style.nav}>
      <NavLink to="/">
        <h1 className={style.title} />
      </NavLink>

      <NavLink to="about">About</NavLink>
    </nav>
  );
};

export default Nav;
