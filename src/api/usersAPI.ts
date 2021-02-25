import { UserType } from '../types/types';
import { instanse, APIResponseType } from './api';

export type GetUsersType = {
  items: Array<UserType>;
  error: string | null;
  totalCount: number;
};

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 5) {
    return instanse
      .get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(userId: number) {
    return instanse.post<APIResponseType>(`follow/${userId}`).then((response) => response.data);
  },
  unfollow(userId: number) {
    return instanse.delete<APIResponseType>(`follow/${userId}`).then((response) => response.data);
  },
};
