import { Avatar, Container, IconButton, Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/authReducer';

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
});

export const HeaderNav = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout())
  }
  
  return (
    <Paper color="secondary">
      <Container className={classes.root}>
        
          <SupervisedUserCircleIcon color="secondary" className={classes.logo} style={{ fontSize: 48 }}></SupervisedUserCircleIcon>
        
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
          <Tab label="Find people" to="/users" component={Link} />
        </Tabs>
        <Box className={classes.login}>
          <Avatar alt="biba"></Avatar>
          <Typography className={classes.userName} variant="h5">
            VHarastei
          </Typography>
          <IconButton onClick={logoutUser} edge="start" aria-label="menu">
            <ExitToAppIcon color="secondary" />
          </IconButton>
        </Box>
      </Container>
    </Paper>
  );
};
