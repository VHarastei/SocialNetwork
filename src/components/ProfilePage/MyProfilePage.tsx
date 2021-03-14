import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStatus, getUserProfile } from '../../redux/profileReducer';
import { AppStateType } from '../../redux/reduxStore';
import { PeopleProfile } from '../Users/PeopleProfile/PeopleProfile';

const MyProfilePage = () => {
  const userId = useSelector((state: AppStateType) => state.auth.userId) as number;
  const profile = useSelector((state: AppStateType) => state.profilePage.profile);
  const status = useSelector((state: AppStateType) => state.profilePage.status);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getStatus(userId));
    dispatch(getUserProfile(userId));
  }, [userId]);

  return <div>{profile && <PeopleProfile profile={profile} status={status} editProfile />}</div>;
};

export default MyProfilePage