import React, { FC } from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { PropsType } from './HeaderContainer';
import { AppStateType } from '../../redux/reduxStore';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authReducer';
import { Avatar } from '@material-ui/core';


const Header: FC<PropsType> = () => {
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const login = useSelector((state: AppStateType) => state.auth.login);
  const photo = useSelector((state: AppStateType) => state.profilePage.profile?.photos.small);
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout())
  }
  return (
    <header className={s.header}>
      <span className={s.appName}>NETWORK</span>
      <div className={s.loginBlock}>
        {isAuth ? (
          <div>
            <Avatar alt='biba' src={photo}></Avatar>
            {login}
            <button onClick={logoutUser}>Log out</button>
          </div>
        ) : (
          <NavLink to={'/login'}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;