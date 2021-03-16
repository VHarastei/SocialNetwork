import { Avatar, Box, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import { Field, Form, Formik } from 'formik';
import React, { ChangeEvent, FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { savePhoto, saveProfile, updateStatus } from '../../../redux/profileReducer';
import { AppStateType } from '../../../redux/reduxStore';
import { ContactsType } from '../../../types/types';
import Preloader from '../../common/Preloader/Preloader';

const useStyles = makeStyles({
  avatar: {
    width: 350,
    height: 350,
    backgroundColor: '#f3673b',
    fontSize: 128,
    margin: '16px auto',
  },
  uploadPhoto: {
    marginBottom: 10,
    float: 'right',
  },
  title: {
    marginTop: 16,
  },
  button: {
    '&:hover': { background: '#ff3300' },
    
  },
});

const loginSchema = Yup.object().shape({
  facebook: Yup.string().url(),
});

export const EditDialog = () => {
  const classes = useStyles();

  const profile = useSelector((state: AppStateType) => state.profilePage.profile);
  const status = useSelector((state: AppStateType) => state.profilePage.status);

  const [open, setOpen] = useState(false);
  const [newPhotoFile, setNewPhotoFile] = useState<any>();
  const [newPhotoUrl, setNewPhotoUrl] = useState<any>();
  
  const dispatch = useDispatch();
  if (!profile) return <Preloader />;

  const initialProfile = {
    ...profile,
    contacts: {
      facebook: profile.contacts.facebook ? profile.contacts.facebook : '',
      vk: profile.contacts.vk ? profile.contacts.vk : '',
      github: profile.contacts.github ? profile.contacts.github : '',
      instagram: profile.contacts.instagram ? profile.contacts.instagram : '',
      mainLink: profile.contacts.mainLink ? profile.contacts.mainLink : '',
      twitter: profile.contacts.twitter ? profile.contacts.twitter : '',
      website: profile.contacts.website ? profile.contacts.website : '',
      youtube: profile.contacts.youtube ? profile.contacts.youtube : '',
    },
    status,
  };
  const handleClickOpen = () => {
    setOpen(true);
    setNewPhotoUrl('');
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSavePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const newImage = e.target.files[0];
      setNewPhotoFile(newImage);
      setNewPhotoUrl(URL.createObjectURL(newImage));
    }
  };

  return (
    <div>
      <Button className={classes.button} color="secondary" variant="contained" onClick={handleClickOpen}>
        Edit profile
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit profile
        </DialogTitle>
        <Formik
          validationSchema={loginSchema}
          initialValues={initialProfile}
          onSubmit={(formData) => {
            console.log(formData);
            const { status } = formData;
            dispatch(saveProfile(formData));
            dispatch(updateStatus(status));
            dispatch(savePhoto(newPhotoFile));
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Box>
                <DialogContent dividers>
                  <Box>
                    <Typography color="secondary" component="h1" variant="h6" gutterBottom>
                      <strong>Change profile photo</strong>
                      <Button
                      className={classes.button + ' ' + classes.uploadPhoto}
                        color="secondary"
                        variant="contained"
                        component="label"
                        //className={classes.uploadPhoto}
                      >
                        Upload photo
                        <input type="file" hidden name="photos.large" onChange={onSavePhoto} />
                      </Button>
                    </Typography>
                    <Avatar
                      variant="rounded"
                      alt={profile.fullName}
                      src={newPhotoUrl || profile.photos.large}
                      className={classes.avatar}
                      aria-label="recipe"
                    >
                      {profile.fullName[0].toUpperCase()}
                    </Avatar>
                  </Box>
                  <Typography
                    color="secondary"
                    component="h1"
                    variant="h6"
                    className={classes.title}
                  >
                    <strong>Change main info</strong>
                  </Typography>
                  <Field as={TextField} fullWidth type="text" name="fullName" label="Enter name" />
                  <Field as={TextField} fullWidth type="text" name="status" label="Enter status" />
                  <Field
                    as={FormControlLabel}
                    name="lookingForAJob"
                    control={<Checkbox color="primary" defaultChecked={profile.lookingForAJob} />}
                    label="Looking for a job"
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    type="text"
                    name="lookingForAJobDescription"
                    label="My professional skills"
                  />
                  <Field as={TextField} fullWidth type="text" name="aboutMe" label="AboutMe" />
                  <Typography
                    color="secondary"
                    component="h1"
                    variant="h6"
                    className={classes.title}
                  >
                    <strong>Change contacts</strong>
                  </Typography>
                  <Box>
                    <ContactsFields errors={errors} touched={touched} contacts={profile.contacts} />
                    {/* <Field
                color="primary"
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="contacts.facebook"
                label="facebook"
                type="text"
                error={Boolean(errors.contacts?.facebook)}
                helperText={touched.contacts?.facebook ? errors.contacts?.facebook : ''} */}
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button
                  className={classes.button}
                    autoFocus
                    type="submit"
                    onClick={handleClose}
                    color="secondary"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    Save changes
                  </Button>
                </DialogActions>
              </Box>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

type ContactsFieldsPropsType = {
  contacts: ContactsType;
  errors: any;
  touched: any;
};

const ContactsFields: FC<ContactsFieldsPropsType> = ({ contacts, errors, touched }) => {
  return (
    <div>
      {Object.keys(contacts).map((key) => {
        return (
          <Field
            key={key}
            as={TextField}
            fullWidth
            type="text"
            name={'contacts.' + key}
            label={key[0].toLocaleUpperCase() + key.slice(1)}
            //error={Boolean(errors.contacts.facebook)}
            //helperText={touched.contacts.facebook ? errors.contacts.facebook : ''}
          />
        );
      })}
    </div>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon color="secondary" />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    height: theme.spacing(50),
    '& > *': {
      marginBottom: theme.spacing(1),
    },
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
