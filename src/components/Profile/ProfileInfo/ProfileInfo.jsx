import React from "react";
import s from "./ProfileInfo.module.css";

const ProfileInfo = () => {
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
        ava + decs
        </div>
    </div>
  );
};

export default ProfileInfo;
