import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Link,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { login } from '../../redux/authReducer';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        VH
      </Link>
      {' 2021.'}
    </Typography>
  );
}

const loginSchema = Yup.object().shape({
  password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  card: {
    backgroundColor: '#ffcccb',
  },
  cardContent: {
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

// const helperTextStyles = makeStyles((theme) => ({
//   root: {
//     margin: 4,
//     '&$error': {
//       color: 'darkred',
//       fontSize: '16px',
//     },
//   },
//   error: {}, //<--this is required to make it work
// }));
// FormHelperTextProps={{ classes: helperText }}

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Formik
      validationSchema={loginSchema}
      initialValues={{ email: '', password: '', rememberMe: false }}
      onSubmit={async (formData, { setStatus, resetForm }) => {
        let signIn = await dispatch(
          login(formData.email, formData.password, formData.rememberMe, null)
        );
        setStatus({ signIn });
        //resetForm({});
      }}
    >
      {({ errors, touched, status = { signIn: null } }) => (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Form className={classes.form}>
              <Field
                color="primary"
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              <Field
                color="primary"
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
              <Field
                as={FormControlLabel}
                name="rememberMe"
                control={<Checkbox color="primary" />}
                label="Remember me"
              />
              {status.signIn && (
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography align="center" component="h1" variant="h6">
                      {status.signIn}
                    </Typography>
                  </CardContent>
                </Card>
              )}
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                fullWidth
                className={classes.submit}
              >
                Sign in
              </Button>
            </Form>
          </div>
          <Box mt={2}>
            <Copyright />
          </Box>
        </Container>
      )}
    </Formik>
  );
}
