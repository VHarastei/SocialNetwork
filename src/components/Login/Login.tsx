import React, { FC } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { composeValidators, maxLength, required } from '../../utils/validators/validators';
import s from './Login.module.css';
import { login } from '../../redux/authReducer';
import { Redirect } from 'react-router-dom';
import { FORM_ERROR } from 'final-form';
import { AppStateType } from '../../redux/reduxStore';

type FormDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string | null;
};

type MapStatePropsType = {
  isAuth: boolean;
  captchaUrl: null | string;
};

type MapDispatchPropsType = {
  onSubmit: (formData: FormDataType) => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

const Login: FC<PropsType> = ({ isAuth, onSubmit, captchaUrl }) => {
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

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

const mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
  return {
    onSubmit: (formData) => {
      return dispatch(
        login(formData.email, formData.password, formData.rememberMe, formData.captcha)
      ).then((err: string) => {
        return { [FORM_ERROR]: err };
      });
    },
  };
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(
  mapStateToProps,
  mapDispatchToProps
)(Login);
