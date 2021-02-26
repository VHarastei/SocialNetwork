import React, { FC } from 'react';
import { Field, Form } from 'react-final-form';
import { ProfileType } from '../../../types/types';
import s from './ProfileInfo.module.css';

// type PropsType = {
//   profile: ProfileType
//   onSubmit: (profile: ProfileType) => any
// }

const ProfileDataForm = ({ profile, onSubmit }) => {
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
          <div>
            Contacts:
            {Object.keys(profile.contacts).map((key) => {
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
        </form>
      )}
    ></Form>
  );
};

export default ProfileDataForm;
