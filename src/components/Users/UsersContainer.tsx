import React from 'react';
import { useSelector } from 'react-redux';
import { getIsFetching } from '../../redux/usersSelectors';
import Preloader from '../common/Preloader/Preloader';
import Users from './Users';

const UserPage = () => {
  const isFetching = useSelector(getIsFetching);
  return (
    <>
      {isFetching ? <Preloader /> : null}
      <Users />
    </>
  );
};

export default UserPage;
