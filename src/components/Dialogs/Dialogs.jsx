import React from 'react';

import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';

const Dialogs = (props) => {
  let state = props.dialogsPage;

  let dialogElements = state.dialogs.map((d) => (
    <DialogItem name={d.name} id={d.id} />
  ));
  let messageElements = state.messages.map((m) => (
    <Message message={m.message} id={m.id} />
  ));
  let newMessageText = state.newMessageText;

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
