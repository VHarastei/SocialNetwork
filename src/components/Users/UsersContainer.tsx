import React from 'react';
import { connect } from 'react-redux';
import { actions, requestUsers, toggleFollow } from '../../redux/usersReducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {
  getUsers,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress,
  getFilter,
} from '../../redux/usersSelectors';
import { FilterType, UserType } from '../../types/types';
import { AppStateType } from '../../redux/reduxStore';

let setCurrentPage = actions.setCurrentPage;

type MapStatePropsType = {
  users: Array<UserType>;
  pageSize: number;
  totalItemsCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: Array<number>;
  filter: FilterType;
};

type MapDispatchPropsType = {
  toggleFollow: (userId: number, followed: boolean) => void;
  setCurrentPage: (pageSize: number) => void;
  requestUsers: (
    currentPage: number,
    pageSize: number,
    term: string,
    friend: null | boolean
  ) => void;
};

type OwnPropsType = {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersAPIContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.pageSize, '', null);
  }
  onChangeCurrentPage = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber);
    this.props.requestUsers(
      pageNumber,
      this.props.pageSize,
      this.props.filter.term,
      this.props.filter.friend
    );
  };
  onSearch = (filter: FilterType) => {
    this.props.requestUsers(1, this.props.pageSize, filter.term, filter.friend);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          //filter={this.props.filter}
          users={this.props.users}
          pageSize={this.props.pageSize}
          totalItemsCount={this.props.totalItemsCount}
          currentPage={this.props.currentPage}
          toggleFollow={this.props.toggleFollow}
          onChangeCurrentPage={this.onChangeCurrentPage}
          onSearch={this.onSearch}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalItemsCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getFilter(state),
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
