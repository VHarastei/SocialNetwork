import React, { FC } from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

type PropsType = {
  isAuth: boolean;
  login: string | null;
  logout: () => void;
}

const Header: FC<PropsType> = (props) => {
  return (
    <header className={s.header}>
      <span className={s.appName}>NETWORK</span>
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.login}
            <button onClick={props.logout}>Log out</button>
          </div>
        ) : (
          <NavLink to={'/login'}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
