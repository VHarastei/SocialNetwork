import { instanse, APIResponseType, ResultCodesEnum, ResultCodeCaptchaEnum } from './api';

export type AuthUserType = {
  id: number;
  email: string;
  login: string;
};

export type LoginType = {
  userId: number;
};

export const authAPI = {
  authUser() {
    return instanse.get<APIResponseType<AuthUserType>>(`auth/me`).then((response) => response.data);
  },
  login(email: string, password: string, rememberMe = false, captcha = null as string | null) {
    return instanse
      .post<APIResponseType<LoginType, ResultCodesEnum | ResultCodeCaptchaEnum>>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((response) => response.data);
  },
  logout() {
    return instanse.delete(`auth/login`).then((response) => response.data);
  },
};
