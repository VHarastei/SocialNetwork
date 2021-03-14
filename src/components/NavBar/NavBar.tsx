import { Avatar, IconButton, Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../redux/authReducer';
import { AppStateType } from '../../redux/reduxStore';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: `space-between`,
    alignItems: 'center',
    margin: '0 16px',
  },
  logo: {
    display: 'inline',
    userSelect: 'none',
  },
  login: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: `space-between`,
  },
  userName: {
    display: 'inline',
    color: 'gray',
    margin: '0 16px 0 8px',
  },
  avatar: {
    color: '#fff',
    backgroundColor: '#f3673b',
  },
});

export const NavBar = () => {
  const classes = useStyles();

  let initialTabValue = 0;
  let path = useHistory().location.pathname;

  let pathSymbols = path.split('');
  pathSymbols.forEach((item, index) => {
    if (item === '/' && index !== 0) {
      pathSymbols.splice(index);
    }
  });
  path = pathSymbols.join('');

  let arrPath = ['/profile', '/chat', '/friends', '/people'];
  arrPath.forEach((item, index) => {
    if (item === path) initialTabValue = index;
  });

  const [tabValue, setTabValue] = React.useState(initialTabValue);
  const login = useSelector((state: AppStateType) => state.auth.login) as string;
  const photo = useSelector((state: AppStateType) => state.profilePage.profile?.photos.small);

  const handleChange = (event: React.ChangeEvent<{}>, newTabValue: number) => {
    setTabValue(newTabValue);
  };

  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <Paper color="secondary">
      <div className={classes.root}>
        <SupervisedUserCircleIcon
          color="secondary"
          className={classes.logo}
          style={{ fontSize: 48 }}
        ></SupervisedUserCircleIcon>

        <Tabs
          value={tabValue}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          centered
        >
          <Tab label="Home" to="/profile" component={Link} />
          <Tab label="Chat" to="/chat" component={Link} />
          <Tab label="Friends" to="/friends" component={Link} />
          <Tab label="Find people" to="/people" component={Link} />
        </Tabs>
        <Box className={classes.login}>
          <Avatar className={classes.avatar} alt={login} src={photo}>
            {login[0]}
          </Avatar>
          <Typography className={classes.userName} variant="h5">
            {login}
          </Typography>
          <IconButton onClick={logoutUser} edge="start" aria-label="menu">
            <ExitToAppIcon color="secondary" />
          </IconButton>
        </Box>
      </div>
    </Paper>
  );
};
