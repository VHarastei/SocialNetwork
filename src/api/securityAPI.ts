import { instanse } from './api';

type SecurityAPIType = {
  url: string | null
}


export const securityAPI = {
  getCaptchaUrl() {
    return instanse.get<SecurityAPIType>(`security/get-captcha-url`).then((response) => response.data);
  },
};
