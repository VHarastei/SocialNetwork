import { Field, Form, Formik } from 'formik';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, requestUsers } from '../../redux/usersReducer';
import {
  getCurrentPage,
  getFilter,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from '../../redux/usersSelectors';
import { FilterType } from '../../types/types';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import styles from './Users.module.css';
import * as queryString from 'querystring';
import { useHistory } from 'react-router-dom';
import PaginatorMUI from '../common/Paginator/PaginatorMUI';
import { MenuItem, Select, TextField } from '@material-ui/core';

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

  const toggleFollow = (userId: number, followed: boolean) => {
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
          toggleFollow={toggleFollow}
          user={u}
        />
      ))}
    </div>
  );
};

export default Users;

type SearchFormType = {
  onSearch: (filter: FilterType) => void;
};

type FriendFormType = 'null' | 'true' | 'false';
type ValuesFormType = {
  term: string;
  friend: FriendFormType;
};

const SearchForm: FC<SearchFormType> = ({ onSearch }) => {
  const filter = useSelector(getFilter);

  return (
    <Formik
      enableReinitialize
      initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType }}
      onSubmit={(
        values: ValuesFormType,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
      ) => {
        const filter: FilterType = {
          term: values.term,
          friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false,
        };
        onSearch(filter);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="term" />
          <Field name="friend" as="select">
            <option value="null" label="All" />
            <option value="true" label="Only followed" />
            <option value="false" label="Only unfollowed" />
          </Field>
          {/* <Select value={'Filter by'}>
            <MenuItem value="10">Ten</MenuItem>
            <MenuItem value="20">Twenty</MenuItem>
          </Select> */}
          <button type="submit" disabled={isSubmitting}>
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
};
