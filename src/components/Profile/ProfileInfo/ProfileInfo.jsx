import React, { useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatusHooks from './ProfileStatusHooks';
import userPhoto from '../../../assets/images/person.png';
import ProfileDataForm from './ProfileDataForm';
import { FORM_ERROR } from 'final-form';

const ProfileInfo = ({
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

  const onSavePhoto = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = async (formData) => {
    let result = await saveProfile(formData);
    if(result.resultCode === 0) setEditMode(false);
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

        {isOwner && <ProfileStatusHooks updateStatus={updateStatus} status={status} statusError={statusError}/> }
      </div>
    </div>
  );
};

const ProfileData = ({ profile, isOwner, toggleEditMode }) => {
  return (
    <div>
      {isOwner && <button onClick={toggleEditMode}>edit</button>}
      <div>Fullname: {profile.fullName}</div>
      <div>Looking for a job: {profile.lookingForAJob ? 'yes' : 'no'}</div>
      {profile.lookingForAJob && (
        <div>My professional skills: {profile.lookingForAJobDescription}</div>
      )}
      <div>About me: {profile.aboutMe}</div>
      <div>
        Contacts:
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className={s.contactItem}>
      {contactTitle} : {contactValue}
    </div>
  );
};

export default ProfileInfo;
