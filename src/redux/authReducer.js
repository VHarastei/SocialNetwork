import { authAPI, securityAPI } from '../api/api';

const SET_USER_DATA = 'SocialNetwork/auth/SET_USER_DATA';
const SET_CAPTCHA_URL = 'SocialNetwork/auth/SET_CAPTCHA_URL';

let initialState = {
  userId: null,
  login: null,
  email: null,
  isAuth: false,
  captchaUrl: null
};

let authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
    case SET_CAPTCHA_URL:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const setAuthUserData = (userId, email, login, isAuth, captchaUrl) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth, captchaUrl },
});

export const setCaptchaUrl = (captchaUrl) => ({
  type: SET_CAPTCHA_URL,
  payload: { captchaUrl },
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

export const getCaptchaUrl = () => {
  return async (dispatch) => {
    const сaptchaUrl = await securityAPI.getCaptchaUrl();
      dispatch(setCaptchaUrl(сaptchaUrl.url));
  };
};


export const login = (email, password, rememberMe, captcha) => {
  return async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === 0) {
      dispatch(getAuthUserData());
    }
    if(data.resultCode === 10) {
      dispatch(getCaptchaUrl())
    }
    return data;
  };
};

export const logout = () => {
  return async (dispatch) => {
    const data = await authAPI.logout()
      if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false, null));
      }
  };
};

export default authReducer;
