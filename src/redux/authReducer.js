import { authAPI } from '../api/api';
import { FORM_ERROR } from 'final-form';

const SET_USER_DATA = 'SET_USER_DATA';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';

let initialState = {
  userId: null,
  login: null,
  email: null,
  isAuth: false,
  loginError: null,
};

let authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case SET_LOGIN_ERROR:
      return {
        ...state,
        loginError: action.loginError,
      };
    default:
      return state;
  }
};

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

export const setLoginError = (loginError) => ({
  type: SET_LOGIN_ERROR,
  loginError,
});

export const getAuthUserData = () => {
  return (dispatch) => {
    return authAPI.authUser().then((data) => {
      if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        dispatch(setAuthUserData(id, email, login, true));
      }
    });
  };
};

export const login = (email, password, rememberMe) => {
  return (dispatch) => {
    authAPI.login(email, password, rememberMe).then((data) => {
      if (data.resultCode === 0) {
        dispatch(getAuthUserData());
        dispatch(setLoginError(null));
      } else {
        dispatch(setLoginError(data.messages[0]));
      }
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    authAPI.logout().then((data) => {
      if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
      }
    });
  };
};

export default authReducer;
