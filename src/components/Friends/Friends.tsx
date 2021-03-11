import { Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { deletePeopleProfile, getPeopleProfile } from '../../redux/peopleProfileReducer';
import { AppStateType } from '../../redux/reduxStore';
import { requestUsers, toggleFollow, actions } from '../../redux/usersReducer';
import {
  getFilter,
  getFollowingInProgress,
  getIsFetching,
  getTotalUsersCount,
  getUsers,
} from '../../redux/usersSelectors';
import { FilterType } from '../../types/types';
import Preloader from '../common/Preloader/Preloader';
import { PeopleProfile } from '../Users/PeopleProfile/PeopleProfile';
import { SearchForm } from '../Users/SearchForm';
import { UserCard } from '../Users/User';

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: 200,
      textAlign: 'center',
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
    },
    searchBar: {
      height: '92.5vh',
      width: 500,
      marginLeft: 12,
      overflow: 'auto',
    },
    friendProfile: {
      width: 800,
      margin: '0 auto',
    },
    withoutProfile: {
      marginTop: 300,
      maxWidth: 400,
      height: '50%',
      margin: '0 auto',
    },
  })
);

const Friends = () => {
  const classes = useStyles();
  let { userId } = useParams<{ userId: string }>();

  const isFetching = useSelector(getIsFetching);
  const users = useSelector(getUsers);
  const followingInProgress = useSelector(getFollowingInProgress);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const filter = useSelector(getFilter);
  const profile = useSelector((state: AppStateType) => state.peopleProfile.profile);
  const status = useSelector((state: AppStateType) => state.peopleProfile.status);

  const dispatch = useDispatch();
  useEffect(() => {
    let newFilter = { term: filter.term, friend: true };
    dispatch(requestUsers(1, 99, newFilter));
    // return () => {
    //   dispatch(actions.setFilter({ term: '', friend: null }));
    // };
  }, []);

  useEffect(() => {
    dispatch(getPeopleProfile(+userId));
    return () => {
      dispatch(deletePeopleProfile());
    };
  }, [userId]);

  const toggleFollowUser = (userId: number, followed: boolean) => {
    dispatch(toggleFollow(userId, followed));
  };

  const onSearch = (filter: FilterType) => {
    dispatch(requestUsers(1, totalUsersCount, filter));
  };

  if (isFetching) return <Preloader />;
  // if (!profile) return <Preloader />;

  return (
    <div className={classes.container}>
      <Box className={classes.searchBar}>
        <Box>
          <SearchForm onSearch={onSearch} selector={false} />
        </Box>
        {users.map((u) => (
          <UserCard
            path={'friends'}
            key={u.id}
            followingInProgress={followingInProgress}
            toggleFollowUser={toggleFollowUser}
            user={u}
          />
        ))}
      </Box>
      <Box className={classes.friendProfile}>
        {userId && profile ? (
          <PeopleProfile
            getProfileCallback={getPeopleProfile}
            profile={profile}
            status={status}
            userId={userId}
          />
        ) : !profile ? (
          <Preloader />
        ) : (
          <Box className={classes.withoutProfile}>
            <Typography variant="h4" style={{ color: 'gray' }}>
              Select friends to preview their profile.
            </Typography>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Friends;
