import React from 'react';
import { connect } from 'react-redux';
import {
  //follow,
  setCurrentPage,
  //unfollow,
  requestUsers,
  toggleFollow
} from '../../redux/usersReducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {
  getUsers,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress,
} from '../../redux/usersSelectors';

class UsersAPIContainer extends React.Component {
  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.pageSize);
  }
  onChangeCurrentPage = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.requestUsers(pageNumber, this.props.pageSize);
  };
  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          users={this.props.users}
          pageSize={this.props.pageSize}
          totalUsersCount={this.props.totalUsersCount}
          currentPage={this.props.currentPage}
          //follow={this.props.follow}
          toggleFollow={this.props.toggleFollow}
          //unfollow={this.props.unfollow}
          onChangeCurrentPage={this.onChangeCurrentPage}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

const UsersContainer = connect(mapStateToProps, {
  toggleFollow,
  //follow,
 //unfollow,
  setCurrentPage,
  requestUsers,
})(UsersAPIContainer);

export default UsersContainer;
