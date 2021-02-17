import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getUserProfile,
  getStatus,
  updateStatus,
  savePhoto
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

const ProfileContainerH = (props) => {
  useEffect(() => {
    let userId = props.match.params.userId;
    if (!userId) {
      userId = props.authorizedUserId;
      if (!userId) props.history.push('/login');
    }
    if (userId) {
      props.getStatus(userId);
      props.getUserProfile(userId);
    }
  }, [props.match.params.userId]);
  return <Profile {...props} isOwner={!props.match.params.userId} />;
};
//TODO 
//FIX STATUS

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
  };
};

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto
  }),
  withRouter
)(ProfileContainerH);
