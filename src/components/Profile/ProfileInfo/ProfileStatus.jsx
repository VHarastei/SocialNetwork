import React, { useEffect, useState } from 'react';
import s from './ProfileInfo.module.css';

const ProfileStatusHooks = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  const activateEditMode = () => {
    if(props.isOwner) setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    setStatus(props.status);
  },[props.status])

  return (
    <div>
      {editMode ? (
        <input
          onChange={onStatusChange}
          autoFocus={true}
          onBlur={deactivateEditMode}
          value={status}
        ></input>
      ) : (
        <div>
          <span onDoubleClick={activateEditMode}>Status: {props.status || 'No status'}</span>
          {props.statusError && <div className={s.error}>{props.statusError}</div>}
        </div>
      )}
    </div>
  );
};

export default ProfileStatusHooks;
