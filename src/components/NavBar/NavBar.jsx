import React from 'react';
import s from './NavBar.module.css';
import { NavLink } from 'react-router-dom';
import SidebarContainer from './Sidebar/SidebarContainer';

const NavBar = () => {
  return (
    <div>
      <nav className={s.nav}>
        <div className={s.item}>
          <NavLink to="/profile" activeClassName={s.active}>
            Profile
          </NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/dialogs" activeClassName={s.active}>
            Messages
          </NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/users" activeClassName={s.active}>
            Find users
          </NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/settings" activeClassName={s.active}>
            Settings
          </NavLink>
        </div>
        <SidebarContainer />
      </nav>
    </div>
  );
};

export default NavBar;
