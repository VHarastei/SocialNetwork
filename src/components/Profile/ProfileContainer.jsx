import React from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../redux/profileReducer';
import Profile from './Profile';
import { withRouter } from 'react-router-dom';

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 2;
    }
    this.props.setUser(userId);
  }

  render() {
    return <Profile profile={this.props.profile} />;
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
  };
};

let WithUrlDataContainer = withRouter(ProfileContainer);

export default connect(mapStateToProps, {
  setUser,
})(WithUrlDataContainer);
