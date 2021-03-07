import React from 'react';
import { useSelector } from 'react-redux';
import { getIsFetching } from '../../redux/usersSelectors';
import Preloader from '../common/Preloader/Preloader';
import { PeopleProfile } from '../Users/PeopleProfile/PeopleProfile';
import UserPage from '../Users/UsersContainer';

export const Friends = () => {
  const isFetching = useSelector(getIsFetching);
  return (
    <>
      {isFetching ? <Preloader /> : null}
      <PeopleProfile />
      <UserPage />
    </>
  );
};


export default Friends;
