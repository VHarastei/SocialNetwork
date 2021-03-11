import { Box, List, ListItem, Typography } from '@material-ui/core';
import ContactsIcon from '@material-ui/icons/Contacts';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkIcon from '@material-ui/icons/Link';
import TwitterIcon from '@material-ui/icons/Twitter';
import WebIcon from '@material-ui/icons/Web';
import YouTubeIcon from '@material-ui/icons/YouTube';
import React, { FC } from 'react';
import { ContactsType } from '../../../types/types';

type ContactsPropsType = {
  contacts: ContactsType;
};

export const Contacts: FC<ContactsPropsType> = ({ contacts }) => {
  let contactsIcons = [
    <FacebookIcon />,
    <WebIcon />,
    <ContactsIcon />,
    <TwitterIcon />,
    <InstagramIcon />,
    <YouTubeIcon />,
    <GitHubIcon />,
    <LinkIcon />,
  ];

  return (
    <List>
      {(Object.keys(contacts) as Array<keyof typeof contacts>).map((key, index) => {
        return (
          <ListItem key={index}>
            <Box style={{ color: '#f3673b', marginRight: 6 }}>{contactsIcons[index]}</Box>
            <Typography variant="subtitle1">
              {key[0].toLocaleUpperCase() + key.slice(1)}: {contacts[key]}
            </Typography>
          </ListItem>
        );
      })}
    </List>
  );
};
