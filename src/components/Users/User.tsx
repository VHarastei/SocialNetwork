import React, { FC } from 'react';
import styles from './Users.module.css';
import userPhoto from '../../assets/images/person.png';
import { NavLink } from 'react-router-dom';
import { userType } from '../../types/types';

type PropsType = {
  user: userType;
  followingInProgress: Array<number>;
  toggleFollow: (userId: number, followed: boolean) => void;
};

const User: FC<PropsType> = ({ user, followingInProgress, toggleFollow }) => {
  return (
    <div>
      <div className={styles.userItem} key={user.id}>
        <div className={styles.userContainer}>
          <NavLink to={`/profile/${user.id}`}>
            <img
              src={user.photos.small != null ? user.photos.small : userPhoto}
              alt="userPhoto"
              className={styles.userPhoto}
            ></img>
          </NavLink>
          <button
            disabled={followingInProgress.some((id) => id === user.id)}
            onClick={() => toggleFollow(user.id, user.followed)}
            className={styles.followBtn}
          >
            {user.followed ? 'Unfollow' : 'Follow'}
          </button>
        </div>
        <div>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </div>
      </div>
    </div>
  );
};

export default User;
