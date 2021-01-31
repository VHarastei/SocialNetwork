import React from 'react';
import s from './NavBar.module.css';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
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
          <NavLink to="/news" activeClassName={s.active}>
            News
          </NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/music" activeClassName={s.active}>
            Music
          </NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/settings" activeClassName={s.active}>
            Settings
          </NavLink>
        </div>
        <div className={s.sideBar}>
          <div>Friends</div>
          <div className={s.sideBarItems}>
            <div className={s.sideBarItem}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzdCnMXv32Be239UIoWX0J4CZZIdZkfDljCw&usqp=CAU"
                alt="img"
              />
              <div>{props.state.friends[0].name}</div>
            </div>
            <div className={s.sideBarItem}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzdCnMXv32Be239UIoWX0J4CZZIdZkfDljCw&usqp=CAU"
                alt="img"
              />
              <div>{props.state.friends[1].name}</div>
            </div>
            <div className={s.sideBarItem}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzdCnMXv32Be239UIoWX0J4CZZIdZkfDljCw&usqp=CAU"
                alt="img"
              />
              <div>{props.state.friends[2].name}</div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
