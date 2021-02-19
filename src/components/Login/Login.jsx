import React from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import {
  composeValidators,
  maxLength,
  required,
} from '../../utils/validators/validators';
import s from './Login.module.css';
import { login } from '../../redux/authReducer';
import { Redirect } from 'react-router-dom';
import { FORM_ERROR } from 'final-form';

const Login = (props) => {
  if (props.isAuth) {
    return <Redirect to="/profile" />;
  }

  return (
    <div>
      <h1>login</h1>
      <Form
        onSubmit={props.onSubmit}
        render={({ submitError, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="email"
              validate={composeValidators(required, maxLength(30))}
            >
              {({ input, meta }) => (
                <div className={s.fieldControl + ' ' + s.error}>
                  <input type="text" placeholder="Email" {...input} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field
              name="password"
              validate={composeValidators(required, maxLength(30))}
            >
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
            {props.captchaUrl && (
              <div>
                <img src={props.captchaUrl} alt="captcha" />
                <Field name="captcha" validate={required}>
                  {({ input, meta }) => (
                    <div className={s.fieldControl + ' ' + s.error}>
                      <input
                        type="text"
                        placeholder="Enter captcha"
                        {...input}
                      />
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

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (formData) => {
      return dispatch(
        login(
          formData.email,
          formData.password,
          formData.rememberMe,
          formData.captcha
        )
      ).then((err) => {
        return { [FORM_ERROR]: err.messages[0] };
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
