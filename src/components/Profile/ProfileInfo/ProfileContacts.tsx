import React, { FC, useState } from 'react';
import s from './ProfileInfo.module.css';
import { ContactsType } from './../../../types/types';

type PropsType = {
  contacts: ContactsType;
};

const Contacts: FC<PropsType> = ({ contacts }) => {
  const [toggleContacts, setToggleContacts] = useState(false);

  const onToggleContacts = () => {
    setToggleContacts(!toggleContacts);
  };
  return (
    <div>
      <button onClick={onToggleContacts}>{toggleContacts ? 'Hide' : 'Show'} contacts</button>
      {toggleContacts &&
        (Object.keys(contacts) as Array<keyof typeof contacts>).map((key) => {
          return <Contact key={key} contactTitle={key} contactValue={contacts[key]} />;
        })}
    </div>
  );
};

type ContactPropsType = {
  contactTitle: string;
  contactValue: string;
};

const Contact: FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
  return (
    <div className={s.contactItem}>
      {contactTitle} : {contactValue}
    </div>
  );
};

export default Contacts;
