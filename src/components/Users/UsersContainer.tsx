import React from 'react';
import { connect } from 'react-redux';
import {
  setCurrentPage,
  requestUsers,
  toggleFollow,
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
import { userType } from '../../types/types';
import { AppStateType } from '../../redux/reduxStore';

type MapStatePropsType = {
  users:Array<userType>;
  pageSize: number;
  totalItemsCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: Array<number>;
};

type MapDispatchPropsType = {
  toggleFollow: (userId: number, followed: boolean) => void;
  setCurrentPage: (pageSize: number) => void;
  requestUsers: (currentPage: number, pageSize: number) => void;
};

type OwnPropsType = {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersAPIContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.pageSize);
  }
  onChangeCurrentPage = (pageNumber: number) => {
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
          totalItemsCount={this.props.totalItemsCount}
          currentPage={this.props.currentPage}
          toggleFollow={this.props.toggleFollow}
          onChangeCurrentPage={this.onChangeCurrentPage}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

let mapStateToProps = (state: AppStateType) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalItemsCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

const UsersContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
  mapStateToProps,
  {
    toggleFollow,
    setCurrentPage,
    requestUsers,
  }
)(UsersAPIContainer);

export default UsersContainer;
