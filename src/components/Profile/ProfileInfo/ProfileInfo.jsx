import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";

const ProfileInfo = (props) => {
  console.log(props);
  if(!props.profile) {
    return <Preloader/>
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
        <div>{props.profile.aboutMe}</div>
        ava + decs
        </div>
    </div>
  );
};

export default ProfileInfo;