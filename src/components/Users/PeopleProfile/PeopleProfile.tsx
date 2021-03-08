import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Container,
  List,
  ListItem,
  Paper,
  Typography,
} from '@material-ui/core';
import ContactsIcon from '@material-ui/icons/Contacts';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkIcon from '@material-ui/icons/Link';
import TwitterIcon from '@material-ui/icons/Twitter';
import WebIcon from '@material-ui/icons/Web';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { makeStyles } from '@material-ui/styles';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deletePeopleProfile, getPeopleProfile } from '../../../redux/peopleProfileReducer';
import { AppStateType } from '../../../redux/reduxStore';
import Preloader from '../../common/Preloader/Preloader';

const useStyles1 = makeStyles({
  container: {
    marginTop: 15,
  },
  paper: {
    maxWidth: 700,
    marginBottom: 15,
    margin: '0 auto',
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
  },
  contactsPaper: {
    maxWidth: 700,
    margin: '0 auto',
    padding: 12,
    marginBottom: 12,
  },
  button: {
    '&:hover': { background: '#ff3300' },
    width: '100px',
    position: 'relative',
  },
  avatar: {
    width: 350,
    height: 350,
    backgroundColor: '#f3673b',
    marginRight: 12,
    fontSize: 128,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  decriptionBox: {
    marginLeft: 12,
  },
  contacts: {
    maxWidth: 700,
  },
  contactsIcons: {
    color: '#f3673b',
    marginRight: 6,
  },
});

type PropsType = {
  backBtnPath?: string | null;
};

export const PeopleProfile: FC<PropsType> = ({ backBtnPath }) => {
  const classes = useStyles1();
  let { userId } = useParams<{ userId: string }>();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPeopleProfile(+userId));

    return () => {
      dispatch(deletePeopleProfile());
    };
  }, [userId]);

  const profile = useSelector((state: AppStateType) => state.peopleProfile.profile);
  const status = useSelector((state: AppStateType) => state.peopleProfile.status);

  let history = useHistory();
  const redirect = () => {
    if (backBtnPath) history.push({ pathname: `/${backBtnPath}` });
  };

  if (!profile) return <Preloader />;

  let contacts = profile.contacts;

  let contactsIcons = [
    <FacebookIcon />,
    <WebIcon />,
    <ContactsIcon />,
    <TwitterIcon />,
    <InstagramIcon />,
    <YouTubeIcon />,
    <GitHubIcon />,
    <LinkIcon />,
  ];
  return (
    <Container className={classes.container}>
      {backBtnPath && (
        <Button onClick={redirect} color="secondary" className={classes.button} variant="contained">
          back
        </Button>
      )}
      <Paper className={classes.paper}>
        <Avatar
          variant="rounded"
          onClick={() => {}}
          alt={profile.fullName}
          src={profile.photos.large}
          className={classes.avatar}
          aria-label="recipe"
        >
          {profile.fullName[0].toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h4">{profile.fullName}</Typography>
          <Typography variant="h6">{status || 'No status'}</Typography>
        </Box>
      </Paper>
      <Paper className={classes.paper}>
        <Box className={classes.decriptionBox}>
          <Typography variant="h4">Desription</Typography>
          <Box className={classes.decriptionBox}>
            <Typography variant="subtitle1"> - About me: {profile.aboutMe}</Typography>
            <Typography variant="subtitle1">
              - Looking for a job: {profile.lookingForAJob ? 'yes' : 'no'}
            </Typography>
            <Typography variant="subtitle1">
              - My professional skills: {profile.lookingForAJobDescription}
            </Typography>
          </Box>
        </Box>
      </Paper>
      <Paper className={classes.contactsPaper}>
        <Accordion className={classes.contacts}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h4">Contacts</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {(Object.keys(contacts) as Array<keyof typeof contacts>).map((key, index) => {
                return (
                  <ListItem key={index}>
                    <Box className={classes.contactsIcons}>{contactsIcons[index]}</Box>
                    <Typography variant="subtitle1">
                      {key[0].toLocaleUpperCase() + key.slice(1)}: {contacts[key]}
                    </Typography>
                  </ListItem>
                );
              })}
            </List>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Container>
  );
};
