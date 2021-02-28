import React, { ChangeEvent, FC, useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';
import userPhoto from '../../../assets/images/person.png';
import ProfileDataForm from './ProfileDataForm';
import { FORM_ERROR } from 'final-form';
import Contacts from './ProfileContacts';
import { ProfileType } from '../../../types/types';

type PropsType = {
  profile: ProfileType | null
  isOwner: boolean
  savePhoto: (file: File) => void
  updateStatus: (status: string) => void
  status: string
  statusError: string
  saveProfile: (FormData: ProfileType) => Promise<any>
}

const ProfileInfo: FC<PropsType> = ({
  profile,
  isOwner,
  savePhoto,
  updateStatus,
  status,
  statusError,
  saveProfile,
}) => {
  const [editMode, setEditMode] = useState(false);
  if (!profile) {
    return <Preloader />;
  }

  const onSavePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = async (formData: ProfileType) => {
    let result: any = await saveProfile(formData);
    if (result.resultCode === 0) setEditMode(false);
    return { [FORM_ERROR]: result.messages[0] };
  };
  return (
    <div>
      <div className={s.descriptionBlock}>
        <img
          className={s.icon}
          src={profile.photos.large || userPhoto}
          alt="icon"
        />
        {isOwner && <input type={'file'} onChange={onSavePhoto} />}
        {editMode ? (
          <ProfileDataForm profile={profile} onSubmit={onSubmit} />
        ) : (
          <ProfileData
            profile={profile}
            isOwner={isOwner}
            toggleEditMode={() => {
              setEditMode(true);
            }}
          />
        )}
        <ProfileStatus {...{ isOwner, updateStatus, status, statusError }} />
      </div>
    </div>
  );
};

type ProfileDataPropsType = {
  profile: ProfileType
  isOwner: boolean
  toggleEditMode: () => void
}

const ProfileData: FC<ProfileDataPropsType> = ({ profile, isOwner, toggleEditMode }) => {
  return (
    <div>
      {isOwner && <button onClick={toggleEditMode}>edit</button>}
      <div>Fullname: {profile.fullName}</div>
      <div>Looking for a job: {profile.lookingForAJob ? 'yes' : 'no'}</div>
      {profile.lookingForAJob && (
        <div>My professional skills: {profile.lookingForAJobDescription}</div>
      )}
      <div>About me: {profile.aboutMe}</div>
      <Contacts contacts={profile.contacts} />
      
    </div>
  );
};

export default ProfileInfo;
