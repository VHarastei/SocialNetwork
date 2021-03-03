import React, { FC } from 'react';
import styles from './Users.module.css';
import userPhoto from '../../assets/images/person.png';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/types';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  button: {
    '&:hover': { background: '#ff3300' },
    width: '100px',
  }
});

type PropsType = {
  user: UserType;
  followingInProgress: Array<number>;
  toggleFollowUser: (userId: number, followed: boolean) => void;
};

const User: FC<PropsType> = ({ user, followingInProgress, toggleFollowUser }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={styles.userItem} key={user.id}>
        <div className={styles.userContainer}>
          <NavLink to={`/users/${user.id}`}>
            <img
              src={user.photos.small != null ? user.photos.small : userPhoto}
              alt="userPhoto"
              className={styles.userPhoto}
            ></img>
          </NavLink>
          <Button
          color="secondary"
          className={classes.button}
          variant="contained"
          disabled={followingInProgress.some((id) => id === user.id)}
          onClick={() => toggleFollowUser(user.id, user.followed)}
          >
            {user.followed ? 'Unfollow' : 'Follow'}
          </Button>
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
