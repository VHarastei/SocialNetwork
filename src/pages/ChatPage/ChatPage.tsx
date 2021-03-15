import { Button, TextField } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from '../../redux/chatReducer';
import { AppStateType } from '../../redux/reduxStore';

const ChatPage = () => {
  return <Chat />;
};

export default ChatPage;

const Chat = () => {
  const status = useSelector((state: AppStateType) => state.chat.status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startMessagesListening());

    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <div>
      {status === 'error' && <div>{'error refresh page'}</div>}
      <Messages />
      <SendMessageForm />
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
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  const messagesRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, SetIsAutoScroll] = useState(false);

  useEffect(() => {
    if (isAutoScroll) {
      messagesRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  }, [messages]);

  const ScrollHandler = (e: React.UIEvent) => {
    const element = e.currentTarget;
    if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
      SetIsAutoScroll(true);
    } else {
      SetIsAutoScroll(false);
    }
  };
  return (
    <div style={{ height: '500px', width: '500px', overflow: 'auto' }} onScroll={ScrollHandler}>
      {messages.map((m, index) => (
        <Message key={m.id} message={m} />
      ))}
      <div ref={messagesRef}></div>
    </div>
  );
};

const Message: FC<{ message: ChatMessageType }> = React.memo( ({ message }) => {
  return (
    <div>
      <img src={message.photo} alt='ph'/>
      <span>{message.userName}</span>
      <div>{message.message}</div>
    </div>
  );
})

const SendMessageForm = () => {
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
      <Form>
        <Field
          as={TextField}
          type="text"
          name="newMessage"
          label="Write new message"
          color="secondary"
        />
        <Button disabled={status !== 'ready'} color="secondary" variant="contained" type="submit">
          Send
        </Button>
      </Form>
    </Formik>
  );
};
