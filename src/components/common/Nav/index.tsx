import { NavLink } from "react-router-dom";
import style from "./Nav.module.css";

const Nav = () => {
  return (
    <nav className={style.nav}>
      <div className={style.container}>
        <h1>Study Space Finder</h1>

        {/* TODO: get links for NavLink */}
        <ul>
          <li>
            <NavLink to="about">About</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
