import React, { FC } from 'react';
import styles from './Users.module.css';
import userPhoto from '../../assets/images/person.png';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/types';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Card, CardHeader } from '@material-ui/core';

const useStyles = makeStyles({
  button: {
    '&:hover': { background: '#ff3300' },
    width: '100px',
  },
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
          <NavLink to={`/people/${user.id}`}>
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

type UserCardPropsType = {
  user: UserType;
  followingInProgress: Array<number>;
  toggleFollowUser: (userId: number, followed: boolean) => void;
};

const useStyles1 = makeStyles({
  root: {
    maxWidth: 600,
    marginBottom: 15,
    margin: '0 auto'
  },
  button: {
    '&:hover': { background: '#ff3300' },
    width: '100px',
    marginTop: '18%',
    marginRight: '10px',
  },
  avatar: {
    width: 56,
    height: 56,
    color: '#fff',
    backgroundColor: '#f3673b',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',

  },
});

export const UserCard: FC<UserCardPropsType> = ({
  user,
  followingInProgress,
  toggleFollowUser,
}) => {
  const classes = useStyles1();

  return (
    <Card className={classes.root} key={user.id}>
      <CardHeader
        avatar={
          <NavLink className={classes.link} to={`/people/${user.id}`}>
            <Avatar
              onClick={() => {}}
              alt={user.name}
              src={user.photos.small}
              className={classes.avatar}
              aria-label="recipe"
            >
              {user.name[0].toUpperCase()}
            </Avatar>
          </NavLink>
        }
        action={
          <Button
            color="secondary"
            className={classes.button}
            variant="contained"
            disabled={followingInProgress.some((id) => id === user.id)}
            onClick={() => toggleFollowUser(user.id, user.followed)}
          >
            {user.followed ? 'Unfollow' : 'Follow'}
          </Button>
        }
        title={user.name}
        subheader={user.status}
      />
    </Card>
  );
};
