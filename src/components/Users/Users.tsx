import { Field, Form, Formik } from 'formik';
import React, { FC } from 'react';
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

const Users: FC = () => {
  const users = useSelector(getUsers);
  const pageSize = useSelector(getPageSize);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const followingInProgress = useSelector(getFollowingInProgress);
  const filter = useSelector(getFilter);

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
      <Paginator
        styles={styles}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        onChangeCurrentPage={onChangeCurrentPage}
        currentPage={currentPage}
        portionSize={10}
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
          <button type="submit" disabled={isSubmitting}>
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
};
