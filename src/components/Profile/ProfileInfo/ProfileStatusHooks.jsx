import React, { useEffect, useState } from 'react';

const ProfileStatusHooks = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  const activateEditMode = () => {
    setEditMode(true);
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
        <span onDoubleClick={activateEditMode}>{props.status || 'No status'}</span>
      )}
    </div>
  );
};

export default ProfileStatusHooks;
