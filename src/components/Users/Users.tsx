import React, { FC } from 'react';
import styles from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { FilterType, UserType } from '../../types/types';
import { Field, Form, Formik } from 'formik';

type PropsType = {
  users: Array<UserType>;
  pageSize: number;
  totalItemsCount: number;
  currentPage: number;
  followingInProgress: Array<number>;
  toggleFollow: (userId: number, followed: boolean) => void;
  onChangeCurrentPage: (pageNumber: number) => void;
  onSearch: (filter: FilterType) => void;
  //filter: FilterType | null
};

const Users: FC<PropsType> = ({
  users,
  pageSize,
  totalItemsCount,
  currentPage,
  toggleFollow,
  onChangeCurrentPage,
  followingInProgress,
  onSearch,
  //filter
}) => {
  return (
    <div>
      <Paginator
        styles={styles}
        totalItemsCount={totalItemsCount}
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
  //filter: FilterType | null
};

type ValuesFormType = {
  term: string;
  friend: 'null' | 'true' | 'false';
};

const SearchForm: FC<SearchFormType> = ({ onSearch }) => {
  return (
    <Formik
      initialValues={{ term: '', friend: 'null' }}
      onSubmit={(
        values: ValuesFormType,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
      ) => {
        //console.log(values);
        const filter: FilterType = {
          term: values.term,
          friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false,
        };
        //console.log(filter);
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
