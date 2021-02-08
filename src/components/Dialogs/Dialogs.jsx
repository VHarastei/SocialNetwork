import React from 'react';
import { Field, Form } from 'react-final-form';
import {Redirect} from 'react-router-dom';
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

  if(!props.isAuth) return <Redirect to={'/login'}/>

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogElements}</div>
      <div>
        <div className={s.messages}>{messageElements}</div>
        <SendMessageForm sendMessage={props.sendMessage}/>
      </div>
    </div>
  );
};

let SendMessageForm = (props) => {
  return (
    <Form
      onSubmit={(obj) => {
        props.sendMessage(obj.newMessageText);
        obj.newMessageText = '';
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="newMessageText">
            {({ input }) => (
              <input type="text" placeholder="Write new message" {...input} />
            )}
          </Field>
          <div>
            <button type="submit">Send</button>
          </div>
        </form>
      )}
    </Form>
  );
};


export default Dialogs;
