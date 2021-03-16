import { Avatar, Box, Card, CardHeader, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppStateType } from '../../redux/reduxStore';

type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

export const Messages = () => {
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
    <div style={{ height: '600px', overflow: 'auto' }} onScroll={ScrollHandler}>
      {messages.map((m, index) => (
        <Message key={m.id} message={m} />
      ))}
      <div ref={messagesRef}></div>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    marginBottom: 15,
    display: 'flex',
    margin: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    color: '#fff',
    backgroundColor: '#f3673b',
    fontSize: 36,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  messageContainer: {
    marginLeft: 10,
  },
  message: {
    wordBreak: 'break-word',
  },
  userName: {
    lineHeight: 1.25
  }
});

const Message: FC<{ message: ChatMessageType }> = React.memo(({ message }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <NavLink className={classes.link} to={`/people/${message.userId}`}>
        <Avatar
          alt={message.userName}
          src={message.photo}
          className={classes.avatar}
          aria-label="recipe"
        >
          {message.userName[0].toUpperCase()}
        </Avatar>
      </NavLink>
      <Box className={classes.messageContainer}>
        <Typography color="secondary" component="h1" variant="h6" className={classes.userName}>
          <strong>
          {message.userName}
            </strong>
        </Typography>
        <Typography variant="body1" className={classes.message}>{message.message}</Typography>
      </Box>
    </Box>
  );
});
