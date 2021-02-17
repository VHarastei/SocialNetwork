import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';
import ProfileStatusHooks from './ProfileStatusHooks';
import userPhoto from '../../../assets/images/person.png';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  const onSavePhoto = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };
  return (
    <div>
      <div className={s.descriptionBlock}>
        <img
          className={s.icon}
          src={props.profile.photos.large || userPhoto}
          alt="icon"
        />
        {props.isOwner && <input type={'file'} onChange={onSavePhoto} />}
        <ProfileStatusHooks
          updateStatus={props.updateStatus}
          status={props.status}
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
