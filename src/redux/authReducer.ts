import { ResultCodeCaptchaEnum } from './../api/api';
import { ResultCodesEnum } from '../api/api';
import { securityAPI } from '../api/securityAPI';
import { authAPI } from '../api/authAPI';
import { InferActionsTypes, BaseThunkType } from './reduxStore';

const SET_USER_DATA = 'SocialNetwork/auth/SET_USER_DATA';
const SET_CAPTCHA_URL = 'SocialNetwork/auth/SET_CAPTCHA_URL';

let initialState = {
  userId: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
};

type ActionsTypes = InferActionsTypes<typeof actions>;
type InitialStateType = typeof initialState;
type ThunkType = BaseThunkType<ActionsTypes>;

let authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

export const actions = {
  setAuthUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: SET_USER_DATA,
      payload: { userId, email, login, isAuth },
    } as const),
  setCaptchaUrl: (captchaUrl: string | null) => ({
    type: SET_CAPTCHA_URL,
    payload: { captchaUrl },
  }),
};

//fix return data type

export const getAuthUserData = (): BaseThunkType<ActionsTypes, Promise<any>> => async (
  dispatch
) => {
  const data = await authAPI.authUser();
  if (data.resultCode === ResultCodesEnum.Succes) {
    let { id, email, login } = data.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
  return data;
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const сaptchaUrl = await securityAPI.getCaptchaUrl();
  dispatch(actions.setCaptchaUrl(сaptchaUrl.url));
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string | null
): BaseThunkType<ActionsTypes, Promise<string>> => async (dispatch) => {
  const data = await authAPI.login(email, password, rememberMe, captcha);
  if (data.resultCode === ResultCodesEnum.Succes) {
    dispatch(getAuthUserData());
  }
  if (data.resultCode === ResultCodeCaptchaEnum.CaptchaIsRequired) {
    dispatch(getCaptchaUrl());
  }
  return data.messages[0];
};

export const logout = (): ThunkType => async (dispatch) => {
  const data = await authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(actions.setAuthUserData(null, null, null, false));
    dispatch(actions.setCaptchaUrl(null));
  }
};

export default authReducer;