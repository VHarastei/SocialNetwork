import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getPeopleProfile } from '../../redux/peopleProfileReducer';
import { AppStateType } from '../../redux/reduxStore';
import Preloader from '../common/Preloader/Preloader';
import { PeopleProfile } from './PeopleProfile/PeopleProfile';
import Users from './Users';

const FindPeoplePage: FC = () => {
  const profile = useSelector((state: AppStateType) => state.peopleProfile.profile);
  const status = useSelector((state: AppStateType) => state.peopleProfile.status);

  let { userId } = useParams<{ userId: string }>();

  const dispatch = useDispatch();
  if (!profile) return <Preloader />;

  if (userId) {
    <PeopleProfile
      getProfileCallback={getPeopleProfile}
      profile={profile}
      status={status}
      userId={userId}
      backBtnPath={'people'}
    />;
  }

  return <Users />;
};

export default FindPeoplePage;
