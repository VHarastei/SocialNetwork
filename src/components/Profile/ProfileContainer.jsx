import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getUserProfile,
  getStatus,
  updateStatus,
} from '../../redux/profileReducer';
import Profile from './Profile';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.history.push('/login');
      } //else {
      //   this.props.getUserProfile(userId);
      // }
    }
    this.props.getStatus(userId);
    this.props.getUserProfile(userId);
  }

  render() {
    return <Profile {...this.props} />;
  }
}

const ProfileContainerH = (props) => {
  let [userId, setUserId] = useState(props.match.params.userId);
  debugger

  useEffect(() => {
    if (!userId) {
      //userId = props.authorizedUserId;
      setUserId(props.authorizedUserId)
      if (!userId) {
        props.history.push('/login');
      }
    }
    props.getStatus(userId);
    props.getUserProfile(userId);
  },[props.authorizedUserId]);
  //ssshhhiiittt
  return <Profile {...props} />;
};

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
  }),
  withRouter
)(ProfileContainer);
