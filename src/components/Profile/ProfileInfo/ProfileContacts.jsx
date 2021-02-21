import React, { useState } from 'react';
import s from './ProfileInfo.module.css';
const Contacts = ({ contacts }) => {
  const [toggleContacts, setToggleContacts] = useState(false);

  const onToggleContacts = () => {
    setToggleContacts(!toggleContacts)
  }
  return (
    <div>
      <button onClick={onToggleContacts}>{toggleContacts? 'Hide': 'Show'} contacts</button>
      {toggleContacts && Object.keys(contacts).map((key) => {
        return (
          <Contact key={key} contactTitle={key} contactValue={contacts[key]} />
        );
      })}
    </div>
  );
};

const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className={s.contactItem}>
      {contactTitle} : {contactValue}
    </div>
  );
};

export default Contacts;

