import React from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import FormStateToRedux from '../../redux/loginFormStateToRedux';
import {
  composeValidators,
  maxLength,
  required,
} from '../../utils/validators/validators';
import s from './Login.module.css';
import { login } from '../../redux/authReducer';
import { Redirect } from 'react-router-dom';

const Login = (props) => {
  if (props.isAuth) {
    return <Redirect to="/profile" />;
  }

  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe);
  };

  return (
    <div>
      <h1>login</h1>
      <Form
        onSubmit={onSubmit}
        render={({ submitError, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {/* <FormStateToRedux form="login" /> */}

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
            {props.loginError && (
              <span className={s.error}>{props.loginError}</span>
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
  loginError: state.auth.loginError,
});

export default connect(mapStateToProps, { login })(Login);
