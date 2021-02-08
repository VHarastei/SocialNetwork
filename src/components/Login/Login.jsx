import React from 'react';
import { Form, Field } from 'react-final-form';
import FormStateToRedux from '../../redux/loginFormStateToRedux';

const Login = () => {
  return (
    <div>
      <h1>login</h1>
      <Form
      
        // initialValues=
        // {{
        //   //
        // }}
        onSubmit={(obj) => {
          console.log(obj);
        }}
        // validate=
        // {(values) => {
        //   // do validation here, and return errors object
        // }}
      >
        {({handleSubmit}) => (
          <form onSubmit={handleSubmit}>
            <FormStateToRedux form='login'/>
            <Field name="login">
              {({ input }) => (
                <input type="text" placeholder="Login" {...input} />
              )}
            </Field>
            <Field name="password">
              {({ input }) => (
                <input type="text" placeholder="Password" {...input} />
              )}
            </Field>
            <Field name="rememberMe" type="checkbox">
              {({ input }) => (
                <input type="checkbox" {...input} />
              )}
            </Field> 
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
};

export default Login;
