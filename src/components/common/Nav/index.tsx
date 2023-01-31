import { NavLink } from "react-router-dom";
import style from "./Nav.module.css";

const Nav = () => {
  return (
    <nav className={style.nav}>
      <div className={style.container}>
      <NavLink to="/"><h1 className={style.title}/></NavLink>
        <ul>
          <li>
            <NavLink to="/">Classrooms</NavLink>
          </li>
          <li>
            <NavLink to="about">About</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
