import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getUserProfile,
  getStatus,
  updateStatus,
  savePhoto,
  saveProfile,
} from '../../redux/profileReducer';
import Profile from './Profile';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// class ProfileContainer extends React.Component {
//   componentDidMount() {
//     let userId = this.props.match.params.userId;
//     if (!userId) {
//       userId = this.props.authorizedUserId;
//       if (!userId) {
//         this.props.history.push('/login');
//       }
//     }
//     this.props.getStatus(userId);
//     this.props.getUserProfile(userId);
//   }
//   render() {
//     return <Profile {...this.props} />;
//   }
// }

// type MapStatePropsType = {
//   match: any;
//   authorizedUserId: number;
//   history: any;
// };

// type MapDispatchPropsType = {
//   getStatus,
//   getUserProfile,
// };


const ProfileContainerH = ({
  match,
  authorizedUserId,
  history,
  getStatus,
  getUserProfile,
  ...props
}) => {
  useEffect(() => {
    let userId = match.params.userId;
    if (!userId) {
      userId = authorizedUserId;
      if (!userId) history.push('/login');
    }
    if (userId) {
      getStatus(userId);
      getUserProfile(userId);
    }
  }, [match, authorizedUserId, getStatus, getUserProfile, history]);
  return <Profile {...props} isOwner={!match.params.userId} />;
};

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    statusError: state.profilePage.statusError,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
  };
};

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
  }),
  withRouter
)(ProfileContainerH);
