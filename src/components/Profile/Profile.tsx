import React, { FC } from 'react';
import { ProfileType } from '../../types/types';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type PropsType = {
  profile: ProfileType | null
  isOwner: boolean
  savePhoto: (file: File) => void
  updateStatus: (status: string) => void
  status: string
  statusError: string
  saveProfile: (FormData: ProfileType) => Promise<any>
}

const Profile: FC<PropsType> = (props) => {
  return (
    <div>
     
      <ProfileInfo {...props} />
      {props.isOwner && <MyPostsContainer />}
    </div>
  );
};

export default Profile;
