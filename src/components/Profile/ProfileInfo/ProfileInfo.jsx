import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div>
        <img
          className={s.icon}
          src="https://www.klaviyo.com/wp-content/uploads/2016/09/abstract-background-1024x273.jpg"
          alt="icon"
        />
      </div>
      <div className={s.descriptionBlock}>
        <ProfileStatus
          updateStatus={props.updateStatus}
          status={props.status}
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
