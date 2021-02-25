import axios from 'axios';

export const instanse = axios.create({
  withCredentials: true,
  headers: {
    'API-KEY': 'e860a89d-c383-4445-923d-957883487557',
  },
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
});

export enum ResultCodesEnum {
  Succes = 0,
  Error = 1,
}

export enum ResultCodeCaptchaEnum {
  CaptchaIsRequired = 10,
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D,
  messages: Array<string>
  resultCode: RC
}

//refactored DAL with TS
