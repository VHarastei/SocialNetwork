import { Box, Button, Divider, IconButton, InputBase, TextField, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../redux/chatReducer';
import { AppStateType } from '../../redux/reduxStore';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      marginLeft: theme.spacing(1),
      flexGrow: 4,
      fontSize: 18
    },
    iconButton: {
      padding: 10,
      float: 'right',
    },
  })
);

export const SendMessageForm = () => {
  const classes = useStyles();

  const status = useSelector((state: AppStateType) => state.chat.status);
  const dispatch = useDispatch();

  return (
    
      <Formik
        initialValues={{ newMessage: '' }}
        onSubmit={(formData, { resetForm }) => {
          dispatch(sendMessage(formData.newMessage));
          resetForm({});
        }}
      >
        <Form className={classes.root}>
        
          <Field
            as={InputBase}
            type="text"
            autoComplete='off'
            name="newMessage"
            color="secondary"
            className={classes.input}
          />
          <IconButton
            disabled={status !== 'ready'}
            type="submit"
            color="secondary"
            className={classes.iconButton}
            aria-label="search"
          >
            <SendIcon style={{fontSize: 28}}/>
          </IconButton>
        </Form>
      </Formik>
    
  );
};
