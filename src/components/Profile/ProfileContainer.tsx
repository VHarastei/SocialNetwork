import React, { ComponentType, FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getStatus, getUserProfile, savePhoto, updateStatus } from '../../redux/profileReducer';
import { AppStateType } from '../../redux/reduxStore';
import { ProfileType } from '../../types/types';
import Profile from './Profile';

// type MapStatePropsType = {
//   profile: ProfileType
//   PStatus: string;
//   statusError: string;
//   authorizedUserId: number;
//   isAuth: boolean;
// };

type MapStatePropsType = ReturnType<typeof mapStateToProps>;

type MapDispatchPropsType = {
  getUserProfile: (userId: number) => void;
  getStatus: (userId: number) => void;
  updateStatus: (status: string) => void;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
};

type PathParamsType = {
  userId: string;
};

type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>;

const ProfileContainer: FC<PropsType> = (props) => {
  useEffect(() => {
    let userId: number = +props.match.params.userId;
    if (!userId) {
      userId = props.authorizedUserId as number;
      if (!userId) props.history.push('/login');
    }
    if (userId) {
      props.getUserProfile(userId);
      props.getStatus(userId);
    }
  }, [props.match, props.authorizedUserId, props.getStatus, props.history]);

  return <Profile {...props} isOwner={!props.match.params.userId} />;
};

let mapStateToProps = (state: AppStateType) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    statusError: state.profilePage.statusError,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
  };
};

export default compose<ComponentType>(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto }),
  withRouter
)(ProfileContainer);
