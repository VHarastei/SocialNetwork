import { Box, Container, makeStyles } from '@material-ui/core';
import * as queryString from 'querystring';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { theme } from '../..';
import { actions, requestUsers, toggleFollow } from '../../redux/usersReducer';
import {
  getCurrentPage,
  getFilter,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from '../../redux/usersSelectors';
import { FilterType } from '../../types/types';
import PaginatorMUI from '../common/Paginator/PaginatorMUI';
import Preloader from '../common/Preloader/Preloader';
import { SearchForm } from './SearchForm';
import { UserCard } from './User';

const useStyles = makeStyles((tm: typeof theme) => ({
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 16,
  },
}));

const Users: FC = () => {
  const classes = useStyles();
  const users = useSelector(getUsers);
  const pageSize = useSelector(getPageSize);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const followingInProgress = useSelector(getFollowingInProgress);
  const isFetching = useSelector(getIsFetching);
  const filter = useSelector(getFilter);

  type QueryParamsType = {
    term?: string;
    page?: string;
    friend?: string;
  };

  const history = useHistory();

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType;
    //console.log('history',parsed);
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
    console.log(query);
    if (!!filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (currentPage !== 1) query.page = String(currentPage);
    history.push({
      pathname: '/people',
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

  if (isFetching) return <Preloader />;

  return (
    <Container component="main" maxWidth="sm">
      <Box className={classes.box}>
        <PaginatorMUI
          totalItemsCount={totalUsersCount}
          pageSize={pageSize}
          onChangeCurrentPage={onChangeCurrentPage}
          currentPage={currentPage}
        />
      </Box>
      <SearchForm onSearch={onSearch} selector />

      {users.map((u) => (
        <UserCard
          path={'people'}
          key={u.id}
          followingInProgress={followingInProgress}
          toggleFollowUser={toggleFollowUser}
          user={u}
        />
      ))}
    </Container>
  );
};

export default Users;
