import React from 'react';
import { connect } from 'react-redux';
import {
  setUserProfile
} from '../../redux/profileReducer';
import Profile from './Profile';
import * as axios from 'axios';
import {withRouter} from 'react-router-dom';

class ProfileAPIContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if(!userId) {
      userId = 2;
    }
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/profile/${userId}`
      )
      .then((response) => {
        this.props.setUserProfile(response.data);
      });
  }
  
  render() {
    return (
      <Profile profile={this.props.profile}/>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile
  };
};

let WithUrlDataContainer = withRouter(ProfileAPIContainer);

const ProfileContainer = connect(
  mapStateToProps,
  {
    setUserProfile,
  }
)(WithUrlDataContainer);

export default ProfileContainer;
