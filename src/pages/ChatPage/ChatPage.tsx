import { Button, TextField } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';

let wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

const ChatPage = () => {
  return <Chat />;
};

export default ChatPage;

const Chat = () => {
  return (
    <div>
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
  const [messages, SetMessages] = useState<ChatMessageType[]>([]);

  useEffect(() => {
    wsChannel.addEventListener('message', (e: MessageEvent) => {
      let newMessage = JSON.parse(e.data);
      SetMessages((prevMessages: ChatMessageType[]) => [...prevMessages, ...newMessage]);
    });
  }, []);

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
  return (
    <Formik
      initialValues={{ newMessage: '' }}
      onSubmit={(formData, { resetForm }) => {
        wsChannel.send(formData.newMessage);
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
        <Button color="secondary" variant="contained" type="submit">
          Send
        </Button>
      </Form>
    </Formik>
  );
};
