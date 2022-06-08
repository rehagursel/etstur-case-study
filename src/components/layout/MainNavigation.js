import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <span className={classes.bold}>ets</span>
        <span className={classes.lighter}>tur</span>
      </div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/hotels-list" activeClassName={classes.active}>
              Oteller
            </NavLink>
          </li>
          <li>
            <NavLink to="/new-hotel" activeClassName={classes.active}>
              Yeni Otel Ekle
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
