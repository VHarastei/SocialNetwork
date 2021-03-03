import * as queryString from 'querystring';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actions, requestUsers, toggleFollow } from '../../redux/usersReducer';
import {
  getCurrentPage,
  getFilter,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from '../../redux/usersSelectors';
import { FilterType } from '../../types/types';
import PaginatorMUI from '../common/Paginator/PaginatorMUI';
import { SearchForm } from './SearchForm';
import User from './User';


const Users: FC = () => {
  const users = useSelector(getUsers);
  const pageSize = useSelector(getPageSize);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const followingInProgress = useSelector(getFollowingInProgress);

  type QueryParamsType = {
    term?: string;
    page?: string;
    friend?: string;
  };

  const filter = useSelector(getFilter);
  const history = useHistory();

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType;
    let actualFilter = filter;
    let actualPage = currentPage;
    if (!!parsed.page) actualPage = Number(parsed.page);
    if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string };

    switch (parsed.friend) {
      case 'null':
        actualFilter = { ...actualFilter, friend: null };
        break;
      case 'true':
        actualFilter = { ...actualFilter, friend: true };
        break;
      case 'false':
        actualFilter = { ...actualFilter, friend: false };
        break;

      default:
        break;
    }

    dispatch(requestUsers(actualPage, pageSize, actualFilter));
  }, []);

  useEffect(() => {
    const query: QueryParamsType = {};
    if (!!filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (currentPage !== 1) query.page = String(currentPage);
    history.push({
      pathname: '/users',
      search: queryString.stringify(query),
    });
  }, [filter, currentPage, history]);

  const dispatch = useDispatch();

  const toggleFollowUser = (userId: number, followed: boolean) => {
    dispatch(toggleFollow(userId, followed));
  };

  const onSearch = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  };

  const onChangeCurrentPage = (pageNumber: number) => {
    dispatch(actions.setCurrentPage(pageNumber));
    dispatch(requestUsers(pageNumber, pageSize, filter));
  };

  return (
    <div>
      <PaginatorMUI
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        onChangeCurrentPage={onChangeCurrentPage}
        currentPage={currentPage}
      />
      <SearchForm onSearch={onSearch} />
      {users.map((u) => (
        <User
          key={u.id}
          followingInProgress={followingInProgress}
          toggleFollowUser={toggleFollowUser}
          user={u}
        />
      ))}
    </div>
  );
};

export default Users;
