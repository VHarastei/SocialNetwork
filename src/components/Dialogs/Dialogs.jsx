import React from 'react';

import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';

const Dialogs = (props) => {
  let dialogsPage = props.dialogsPage;

  let dialogElements = dialogsPage.dialogs.map((d) => (
    <DialogItem name={d.name} id={d.id} />
  ));
  let messageElements = dialogsPage.messages.map((m) => (
    <Message message={m.message} id={m.id} />
  ));
  let newMessageText = dialogsPage.newMessageText;

  let onSendMessageClick = () => {
    props.sendMessage();
  };

  let onMessageChange = (e) => {
    let text = e.target.value;
    props.messageChange(text);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogElements}</div>
      <div>
        <div className={s.messages}>{messageElements}</div>
        <textarea onChange={onMessageChange} value={newMessageText}></textarea>
        <button onClick={onSendMessageClick}>Send</button>
      </div>
    </div>
  );
};

export default Dialogs;
