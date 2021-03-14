import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ProfileType } from '../../../types/types';
import Preloader from '../../common/Preloader/Preloader';
import { Contacts } from './Contacts';
import { EditDialog } from './EditDialog';

const useStyles = makeStyles({
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
  editProfile?: boolean;
  profile: ProfileType;
  status: string;
};

export const PeopleProfile: FC<PropsType> = ({ profile, status, backBtnPath, editProfile }) => {
  const classes = useStyles();

  let history = useHistory();
  const redirect = () => {
    if (backBtnPath) history.push({ pathname: `/${backBtnPath}` });
  };

  if (!profile) return <Preloader />;
  const contacts = profile.contacts;

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
          {editProfile && <EditDialog />}
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
            <Contacts contacts={contacts} />
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Container>
  );
};
