import style from "./Nav.module.css";

const Nav = () => {
  return (
    <nav className={style.nav}>
      <div className={style.container}>
        <h1>Study Space Finder</h1>

        <ul>
          <li>Class rooms</li>
          <li>Group Sessions</li>
          <li>Login</li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
