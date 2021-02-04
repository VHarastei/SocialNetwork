import React from 'react';
import s from './NavBar.module.css';
import { NavLink } from 'react-router-dom';
import SidebarContainer from './Sidebar/SidebarContainer';

const NavBar = () => {
  return (
    <div>
      <nav className={s.nav}>
      <NavLink to="/profile" activeClassName={s.active}>
        <div className={s.item}>
            Profile
        </div>
        </NavLink>
        <NavLink to="/dialogs" activeClassName={s.active}>
        <div className={s.item}>
            Messages
          
        </div>
        </NavLink>
        <NavLink to="/users" activeClassName={s.active}>
        <div className={s.item}>
          
            Find users
          
        </div>
        </NavLink>
        <NavLink to="/settings" activeClassName={s.active}>
        <div className={s.item}>
         
            Settings
          
        </div>
        </NavLink>
        <SidebarContainer />
      </nav>
    </div>
  );
};

export default NavBar;
