import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/types';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Card, CardHeader } from '@material-ui/core';

type PropsType = {
  path: string;
  user: UserType;
  followingInProgress: Array<number>;
  toggleFollowUser: (userId: number, followed: boolean) => void;
};

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    marginBottom: 15,
    margin: '0 auto',
  },
  button: {
    '&:hover': { background: '#ff3300' },
    width: '100px',
    marginTop: '25%',
    marginRight: '10px',
  },
  avatar: {
    width: 80,
    height: 80,
    color: '#fff',
    backgroundColor: '#f3673b',
    fontSize: 36,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

export const UserCard: FC<PropsType> = ({ path, user, followingInProgress, toggleFollowUser }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} key={user.id}>
      <CardHeader
        avatar={
          <NavLink className={classes.link} to={`/${path}/${user.id}`}>
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
        titleTypographyProps={{ variant: 'h6' }}
        title={user.name}
        subheader={user.status}
      />
    </Card>
  );
};
