import { PhotosType } from './profileReducer';
import { usersAPI } from '../api/api';

const TOGGLE_FOLLOWING = 'SocialNetwork/users/TOGGLE_FOLLOWING';
const SET_USERS = 'SocialNetwork/users/SET_USERS';
const SET_CURRENT_PAGE = 'SocialNetwork/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SocialNetwork/users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'SocialNetwork/users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'SocialNetwork/users/TOGGLE_IS_FOLLOWING_PROGRESS';

type usersType = {
  id: number;
  name: string;
  status: string;
  photos: PhotosType;
  followed: boolean;
};

let initialState = {
  users: [] as Array<usersType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>,
};

type InitialStateType = typeof initialState;
let usersReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case TOGGLE_FOLLOWING:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: !u.followed };
          }
          return u;
        }),
      };
    case SET_USERS:
      return {
        ...state,
        users: [...action.users],
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    default:
      return state;
  }
};

type toggleFollowSuccededType = {
  type: typeof TOGGLE_FOLLOWING;
  userId: number;
};
export const toggleFollowSucceded = (userId: number): toggleFollowSuccededType => ({
  type: TOGGLE_FOLLOWING,
  userId,
});

type setUsersType = {
  type: typeof SET_USERS;
  users: usersType;
};
export const setUsers = (users: usersType): setUsersType => ({ type: SET_USERS, users });

type setCurrentPageType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};
export const setCurrentPage = (currentPage: number): setCurrentPageType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

type setTotalUsersCountType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  totalUsersCount: number;
};
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountType => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount,
});

type toggleIsFetchingType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

type toggleFollowingProgressType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
  isFetching: boolean;
  userId: number;
};
export const toggleFollowingProgress = (
  isFetching: boolean,
  userId: number
): toggleFollowingProgressType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

export const requestUsers = (currentPage: number, pageSize: number) => {
  return async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    const data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };
};

export const toggleFollow = (userId: number, followed: boolean) => {
  return async (dispatch: any) => {
    dispatch(toggleFollowingProgress(true, userId));
    let data = followed ? await usersAPI.unfollow(userId) : await usersAPI.follow(userId);
    if (data.resultCode === 0) {
      dispatch(toggleFollowSucceded(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
  };
};

export default usersReducer;