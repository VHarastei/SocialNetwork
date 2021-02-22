import { authAPI, securityAPI } from '../api/api';

const SET_USER_DATA = 'SocialNetwork/auth/SET_USER_DATA';
const SET_CAPTCHA_URL = 'SocialNetwork/auth/SET_CAPTCHA_URL';

let initialState = {
  userId: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
};

type InitialStateType = typeof initialState;
let authReducer = (state = initialState, action: any): InitialStateType => {
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

type SetAuthUserDataPayloadType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};

type SetAuthUserDataType = {
  type: typeof SET_USER_DATA;
  payload: SetAuthUserDataPayloadType;
};

export const setAuthUserData = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetAuthUserDataType => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

type SetCaptchaUrlType = {
  type: typeof SET_CAPTCHA_URL;
  payload: { captchaUrl: string | null };
};

export const setCaptchaUrl = (captchaUrl: string | null): SetCaptchaUrlType => ({
  type: SET_CAPTCHA_URL,
  payload: { captchaUrl },
});

export const getAuthUserData = () => {
  return async (dispatch: any) => {
    const data = await authAPI.authUser();
    if (data.resultCode === 0) {
      let { id, email, login } = data.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
    return data;
  };
};

export const getCaptchaUrl = () => {
  return async (dispatch: any) => {
    const сaptchaUrl = await securityAPI.getCaptchaUrl();
    dispatch(setCaptchaUrl(сaptchaUrl.url));
  };
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => {
  return async (dispatch: any) => {
    const data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === 0) {
      dispatch(getAuthUserData());
    }
    if (data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    return data;
  };
};

export const logout = () => {
  return async (dispatch: any) => {
    const data = await authAPI.logout();
    if (data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
      dispatch(setCaptchaUrl(null));
    }
  };
};

export default authReducer;
