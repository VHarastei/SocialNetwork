import axios from 'axios';
import { ProfileType } from '../types/types';

const instanse = axios.create({
  withCredentials: true,
  headers: {
    'API-KEY': 'e860a89d-c383-4445-923d-957883487557',
  },
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 5) {
    return instanse
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(userId: number) {
    return instanse.post(`follow/${userId}`).then((response) => response.data);
  },
  unfollow(userId: number) {
    return instanse.delete(`follow/${userId}`).then((response) => response.data);
  },
};

export const profileAPI = {
  getProfile(userId: number) {
    return instanse.get(`profile/${userId}`).then((response) => response.data);
  },
  getStatus(userId: number) {
    return instanse.get(`profile/status/${userId}`).then((response) => response.data);
  },
  updateStatus(status: string) {
    return instanse.put(`profile/status`, { status }).then((response) => response.data);
  },
  savePhoto(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    return instanse
      .put(`profile/photo`, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      })
      .then((response) => response.data);
  },
  saveProfile(profile: ProfileType) {
    return instanse.put(`profile`, profile).then((response) => response.data);
  },
};

export enum ResultCodesEnum {
  Succes = 0,
  Error = 1,
}

export enum ResultCodeCaptchaEnum {
  CaptchaIsRequired = 10,
}

type AuthUserType = {
  data: { id: number; email: string; login: string };
  resultCode: ResultCodesEnum;
  messages: Array<string>;
};

type LoginType = {
  data: { userId: number };
  resultCode: ResultCodesEnum | ResultCodeCaptchaEnum;
  messages: Array<string>;
};

export const authAPI = {
  authUser() {
    return instanse.get<AuthUserType>(`auth/me`).then((response) => response.data);
  },
  login(email: string, password: string, rememberMe = false, captcha = null as string | null) {
    return instanse
      .post<LoginType>(`auth/login`, { email, password, rememberMe, captcha })
      .then((response) => response.data);
  },
  logout() {
    return instanse.delete(`auth/login`).then((response) => response.data);
  },
};

export const securityAPI = {
  getCaptchaUrl() {
    return instanse.get(`security/get-captcha-url`).then((response) => response.data);
  },
};