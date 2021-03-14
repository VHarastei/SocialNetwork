import React, { FC } from 'react';
import { Field, Form } from 'react-final-form';
import { ContactsType, ProfileType } from '../../../types/types';
import s from './ProfileInfo.module.css';

type PropsType = {
  profile: ProfileType;
  onSubmit: (profile: ProfileType) => any;
};

const ProfileDataForm: FC<PropsType> = ({ profile, onSubmit }) => {
  return (
    <Form
      initialValues={profile}
      onSubmit={onSubmit}
      render={({ submitError, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <button type="submit">Save</button>
          </div>
          {submitError && <div className={s.error}>{submitError}</div>}
          <Field name="fullName">
            {({ input }) => (
              <div>
                <div>Full name: </div>
                <input type="text" placeholder="Full name" {...input} />
              </div>
            )}
          </Field>
          <Field name="lookingForAJob" type="checkbox">
            {({ input }) => (
              <div>
                <div>Looking for a job: </div>
                <input type="checkbox" {...input} />
              </div>
            )}
          </Field>
          <Field name="lookingForAJobDescription">
            {({ input }) => (
              <div>
                <div>My professional skills: </div>
                <textarea placeholder="My professional skills" {...input} />
              </div>
            )}
          </Field>
          <Field name="aboutMe">
            {({ input }) => (
              <div>
                <div>About me: </div>
                <textarea placeholder="About me" {...input} />
              </div>
            )}
          </Field>
          <Contacts contacts={profile.contacts}/>
        </form>
      )}
    ></Form>
  );
};

type ContactsPropsType = {
  contacts: ContactsType;
};

const Contacts: FC<ContactsPropsType> = ({ contacts }) => {
  return (
    <div>
      Contacts:
      {Object.keys(contacts).map((key) => {
        return (
          <div key={key} className={s.contactItem}>
            {key}:
            <Field name={'contacts.' + key}>
              {({ input }) => (
                <div>
                  <input placeholder={key} type="text" {...input} />
                </div>
              )}
            </Field>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileDataForm;
