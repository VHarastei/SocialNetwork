import { Avatar, Container, IconButton, Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { deepOrange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/authReducer';
import { AppStateType } from '../../redux/reduxStore';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: `space-between`,
    alignItems: 'center',
  },
  tabs: {
    // display: 'inline'
    //width: '700px',
  },
  logo: {
    //width: '100%',
    display: 'inline',
    userSelect: 'none',
  },
  login: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: `space-between`,
  },
  userName: {
    //width: '100%',
    display: 'inline',
    color: 'gray',
    margin: '0 16px 0 8px',
  },
  avatar: {
    color: '#fff', backgroundColor: '#f3673b'
  }
});

export const HeaderNav = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const login = useSelector((state: AppStateType) => state.auth.login) as string;
  const photo = useSelector((state: AppStateType) => state.profilePage.profile?.photos.small);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <Paper color="secondary">
      <Container className={classes.root}>
        <SupervisedUserCircleIcon
          color="secondary"
          className={classes.logo}
          style={{ fontSize: 48 }}
        ></SupervisedUserCircleIcon>

        <Tabs
          className={classes.tabs}
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          centered
        >
          <Tab label="Home" to="/profile" component={Link} />
          <Tab label="Messages" to="/dialogs" component={Link} />
          <Tab label="Friends" to="/users" component={Link} />
          <Tab label="Find people" to="/people" component={Link} />
        </Tabs>
        <Box className={classes.login}>
          <Avatar
            className={classes.avatar}
            alt={login}
            src={photo}
          >
            {login[0]}
          </Avatar>
          <Typography className={classes.userName} variant="h5">
            {login}
          </Typography>
          <IconButton onClick={logoutUser} edge="start" aria-label="menu">
            <ExitToAppIcon color="secondary" />
          </IconButton>
        </Box>
      </Container>
    </Paper>
  );
};
