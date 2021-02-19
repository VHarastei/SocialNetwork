import React from 'react';
import { Field, Form } from 'react-final-form';
import { Redirect } from 'react-router-dom';
import { maxLength } from '../../utils/validators/validators';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';

const Dialogs = (props) => {
  let dialogsPage = props.dialogsPage;

  let dialogElements = dialogsPage.dialogs.map((d) => (
    <DialogItem key={d.id} name={d.name} id={d.id} />
  ));
  let messageElements = dialogsPage.messages.map((m) => (
    <Message key={m.id} message={m.message} id={m.id} />
  ));

  if (!props.isAuth) return <Redirect to={'/login'} />;

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogElements}</div>
      <div>
        <div className={s.messages}>{messageElements}</div>
        <SendMessageForm sendMessage={props.sendMessage} />
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
          <Field name="newMessageText" validate={maxLength(300)}>
            {({ input, meta }) => (
              <div className={s.fieldControl + ' ' + s.error}>
                <input type="text" placeholder="Write new message" {...input} />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
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
