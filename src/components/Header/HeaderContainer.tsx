import React, { FC } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { logout } from '../../redux/authReducer';
import { AppStateType } from '../../redux/reduxStore';

type MapStatePropsType = {
  isAuth: boolean;
  login: string | null;
};

type MapDispatchPropsType = {
  logout: () => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

const HeaderContainer: FC<PropsType> = (props) => {
  return <Header {...props} />;
};

let mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};
export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
  logout,
})(HeaderContainer);
