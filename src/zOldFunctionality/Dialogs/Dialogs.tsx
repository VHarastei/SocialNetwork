import React, { FC } from 'react';
import { Field, Form } from 'react-final-form';
import { DialogsType, MessagesType } from '../../types/types';
import { maxLength } from '../../utils/validators/validators';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';

type PropsType = {
  dialogs: Array<DialogsType>;
  messages: Array<MessagesType>;
  sendMessage: (newMessageText: string) => void;
};

const Dialogs: FC<PropsType> = ({ dialogs, messages, sendMessage }) => {
  let dialogElements = dialogs.map((d) => <DialogItem key={d.id} name={d.name} id={d.id} />);
  let messageElements = messages.map((m) => <Message key={m.id} message={m.message} />);

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogElements}</div>
      <div>
        <div className={s.messages}>{messageElements}</div>
        <SendMessageForm sendMessage={sendMessage} />
      </div>
    </div>
  );
};

type SendMessageFormPropsType = {
  sendMessage: (newMessageText: string) => void;
};

let SendMessageForm: FC<SendMessageFormPropsType> = ({ sendMessage }) => {
  return (
    <Form
      onSubmit={(obj) => {
        sendMessage(obj.newMessageText);
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
