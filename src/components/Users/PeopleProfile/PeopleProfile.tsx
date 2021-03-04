import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deletePeopleProfile, getPeopleProfile } from '../../../redux/peopleProfileReducer';
import { AppStateType } from '../../../redux/reduxStore';
import Preloader from '../../common/Preloader/Preloader';
import { ProfileData, ProfilePhoto } from '../../Profile/ProfileInfo/ProfileInfo';

export const PeopleProfile = () => {
  let { userId } = useParams<{ userId: string }>();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userId) {
      dispatch(getPeopleProfile(+userId));
    }
    return () => {
      dispatch(deletePeopleProfile());
    };
  }, []);

  const profile = useSelector((state: AppStateType) => state.peopleProfile.profile);
  const status = useSelector((state: AppStateType) => state.peopleProfile.status);

  let history = useHistory();
  const redirect = () => {
    history.push({
      pathname: '/users',
    });
  };
  if (!profile) return <Preloader />;
  
  return (
    <div>
      <Button onClick={redirect} color="secondary" variant="contained">
        Back
      </Button>
      <ProfilePhoto photo={profile.photos.large} />
      <ProfileData profile={profile} />
      <div>Status: {status || 'No status'}</div>
    </div>
  );
};
