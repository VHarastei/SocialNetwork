import { Button, TextField } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chatReducer';
import { AppStateType } from '../../redux/reduxStore';

const ChatPage = () => {
  return <Chat />;
};

export default ChatPage;

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startMessagesListening());

    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <div>
      <Messages />
      <SendMessageForm  />
    </div>
  );
};

type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

const Messages = () => {
const messages = useSelector((state: AppStateType) => state.chat.messages)

  return (
    <div style={{ height: '500px', width: '500px', overflow: 'auto' }}>
      {messages.map((m, index) => (
        <Message key={index} message={m} />
      ))}
    </div>
  );
};

const Message: FC<{ message: ChatMessageType }> = ({ message }) => {
  return (
    <div>
      <img src={message.photo} />
      <span>{message.userName}</span>
      <div>{message.message}</div>
    </div>
  );
};

const SendMessageForm = () => {
  const [isReady, SetIsReady] = useState(false);
  const dispatch = useDispatch();


  return (
    <Formik
      initialValues={{ newMessage: '' }}
      onSubmit={(formData, { resetForm }) => {
        dispatch(sendMessage(formData.newMessage));
        resetForm({});
      }}
    >
      <Form>
        <Field
          as={TextField}
          type="text"
          name="newMessage"
          label="Write new message"
          color="secondary"
        />
        <Button
          disabled={false}
          color="secondary"
          variant="contained"
          type="submit"
        >
          Send
        </Button>
      </Form>
    </Formik>
  );
};
