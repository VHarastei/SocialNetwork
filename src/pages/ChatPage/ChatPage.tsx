import { Button, TextField } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';

const ChatPage = () => {
  return <Chat />;
};

export default ChatPage;

const Chat = () => {
  const [wsChannel, SetWsChannel] = useState<WebSocket | null>(null);

  useEffect(() => {
    let ws: WebSocket;
    const closeHandler = () => {
      setTimeout(createChannel, 3000);
    };

    const createChannel = () => {
      ws?.removeEventListener('close', closeHandler);
      ws?.close();

      ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
      ws.addEventListener('close', closeHandler);
      SetWsChannel(ws);
    };
    createChannel();

    return () => {
      ws?.removeEventListener('close', closeHandler);
      ws?.close();
    };
  }, []);

  return (
    <div>
      <Messages wsChannel={wsChannel} />
      <SendMessageForm wsChannel={wsChannel} />
    </div>
  );
};

type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

const Messages: FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
  const [messages, SetMessages] = useState<ChatMessageType[]>([]);

  useEffect(() => {
    const messageHandler = (e: MessageEvent) => {
      let newMessage = JSON.parse(e.data);
      SetMessages((prevMessages: ChatMessageType[]) => [...prevMessages, ...newMessage]);
    };
    wsChannel?.addEventListener('message', messageHandler);
    return () => {
      wsChannel?.removeEventListener('message', messageHandler);
    };
  }, [wsChannel]);

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

const SendMessageForm: FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
  const [isReady, SetIsReady] = useState(false);

  useEffect(() => {
    const openHandler = () => {
      SetIsReady(true);
    };
    wsChannel?.addEventListener('open', openHandler);

    return () => {
      wsChannel?.removeEventListener('open', openHandler);
    };
  }, [wsChannel]);

  return (
    <Formik
      initialValues={{ newMessage: '' }}
      onSubmit={(formData, { resetForm }) => {
        wsChannel?.send(formData.newMessage);
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
          disabled={wsChannel === null || isReady === false}
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
