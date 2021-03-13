import { Box, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { Field, Form, Formik, FormikErrors, FormikTouched } from 'formik';
import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveProfile } from '../../../redux/profileReducer';
import { AppStateType } from '../../../redux/reduxStore';
import { ContactsType, ProfileType } from '../../../types/types';
import Preloader from '../../common/Preloader/Preloader';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  facebook: Yup.string().url()
});

export const EditDialog = () => {
  const profile = useSelector((state: AppStateType) => state.profilePage.profile);
  const [open, setOpen] = useState(false);
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
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="secondary" variant="contained" onClick={handleClickOpen}>
        Edit profile
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit profile
        </DialogTitle>
        <Formik
          validationSchema={loginSchema}
          initialValues={initialProfile}
          onSubmit={(formData: ProfileType) => {
            console.log(formData);
            dispatch(saveProfile(formData));
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Box>
                <DialogContent dividers>
                  <Field as={TextField} fullWidth type="text" name="fullName" label="Enter name" />
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
                  <Typography style={{}} component="h1" variant="h6">
                    Change contacts
                  </Typography>
                  <Box style={{ marginLeft: 12 }}>
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
  errors: any
  touched: any
};

const ContactsFields: FC<ContactsFieldsPropsType> = ({ contacts, errors, touched }) => {
  console.log(errors)
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
            label={key}
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
