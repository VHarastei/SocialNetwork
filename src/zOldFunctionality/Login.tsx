import { FORM_ERROR } from 'final-form';
import React, { FC } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../redux/authReducer';
import { AppStateType } from '../redux/reduxStore';
import { composeValidators, maxLength, required } from '../utils/validators/validators';
import s from './Login.module.css';

type FormDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string | null;
};

const Login: FC= () => {
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
  const dispatch = useDispatch();

  const onSubmit = async (formData: FormDataType) => {
    let res = await dispatch(
      login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    );
    return { [FORM_ERROR]: res };
  };

  if (isAuth) {
    return <Redirect to="/profile" />;
  }

  return (
    <div>
      <h1>login</h1>
      <Form
        onSubmit={onSubmit}
        render={({ submitError, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="email" validate={composeValidators(required, maxLength(30))}>
              {({ input, meta }) => (
                <div className={s.fieldControl + ' ' + s.error}>
                  <input type="text" placeholder="Email" {...input} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="password" validate={composeValidators(required, maxLength(30))}>
              {({ input, meta }) => (
                <div className={s.fieldControl + ' ' + s.error}>
                  <input type="password" placeholder="Password" {...input} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="rememberMe" type="checkbox">
              {({ input, meta }) => (
                <div>
                  <span>Remember me</span>
                  <input type="checkbox" {...input} />
                </div>
              )}
            </Field>
            {submitError && <div className={s.error}>{submitError}</div>}
            {captchaUrl && (
              <div>
                <img src={captchaUrl} alt="captcha" />
                <Field name="captcha" validate={required}>
                  {({ input, meta }) => (
                    <div className={s.fieldControl + ' ' + s.error}>
                      <input type="text" placeholder="Enter captcha" {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
            )}
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        )}
      ></Form>
    </div>
  );
};

export default Login
