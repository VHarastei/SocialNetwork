import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { deletePeopleProfile, getPeopleProfile } from '../../redux/peopleProfileReducer';
import { AppStateType } from '../../redux/reduxStore';
import Preloader from '../common/Preloader/Preloader';
import { PeopleProfile } from './PeopleProfile/PeopleProfile';
import Users from './Users';

const FindPeoplePage: FC = () => {
  const profile = useSelector((state: AppStateType) => state.peopleProfile.profile);
  const status = useSelector((state: AppStateType) => state.peopleProfile.status);

  let { userId } = useParams<{ userId: string }>();

  const dispatch = useDispatch();

  const [isLoadingProfile, SetIsLoadingProfile] = useState(false);
  useEffect(() => {
    if (userId) {
      dispatch(getPeopleProfile(+userId));
      SetIsLoadingProfile(true);
    }
    return () => {
      dispatch(deletePeopleProfile());
      SetIsLoadingProfile(false);
    };
  }, [userId]);

  if (profile) {
    return <PeopleProfile profile={profile} status={status} backBtnPath={'people'} />;
  }
  if (isLoadingProfile) {
    return <Preloader />;
  }
  return <Users />;
};

export default FindPeoplePage;
