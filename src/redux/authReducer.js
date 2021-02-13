import { authAPI } from '../api/api';

const SET_USER_DATA = 'SocialNetwork/auth/SET_USER_DATA';
const SET_LOGIN_ERROR = 'SocialNetwork/auth/SET_LOGIN_ERROR';

let initialState = {
  userId: null,
  login: null,
  email: null,
  isAuth: false,
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
  return async (dispatch) => {
    const data = await authAPI.authUser();
    if (data.resultCode === 0) {
      let { id, email, login } = data.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
    return data;
  };
};

export const login = (email, password, rememberMe) => {
  return async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe);
    if (data.resultCode === 0) {
      dispatch(getAuthUserData());
    }
    return data;
  };
};

export const logout = () => {
  return async (dispatch) => {
    const data = await authAPI.logout()
      if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
      }
  };
};

export default authReducer;
