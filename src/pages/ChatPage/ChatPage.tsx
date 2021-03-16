import { Container, Divider, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '../../components/common/Preloader/Preloader';
import { startMessagesListening, stopMessagesListening } from '../../redux/chatReducer';
import { AppStateType } from '../../redux/reduxStore';
import { Messages } from './Messages';
import { SendMessageForm } from './SendMessageForm';

const useStyles = makeStyles({
  container: {
    marginTop: 15,
  },
  paper: {
    padding: 20
  },
});

const ChatPage = () => {
  return <Chat />;
};
export default ChatPage;

const Chat = () => {
  const classes = useStyles();

  const status = useSelector((state: AppStateType) => state.chat.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startMessagesListening());

    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <Container className={classes.container} maxWidth="sm" disableGutters>
      {status === 'ready' ? <Paper className={classes.container} >
        {/* {status === 'error' && <div>{'error refresh page'}</div>} */}
        <Messages />
        <Divider />
        <SendMessageForm />
      </Paper> : <Preloader />
}
    </Container>
  );
};
