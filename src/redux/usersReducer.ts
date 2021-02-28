import { UserType, FilterType } from './../types/types';
import { usersAPI } from '../api/usersAPI';
import { InferActionsTypes, BaseThunkType } from './reduxStore';

const TOGGLE_FOLLOWING = 'SocialNetwork/users/TOGGLE_FOLLOWING';
const SET_USERS = 'SocialNetwork/users/SET_USERS';
const SET_FILTER = 'SocialNetwork/users/SET_FILTER';
const SET_CURRENT_PAGE = 'SocialNetwork/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SocialNetwork/users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'SocialNetwork/users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'SocialNetwork/users/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>,
  filter: {
    term: '',
    friend: null as null | boolean
  }
};
type ActionsTypes = InferActionsTypes<typeof actions>;
export type InitialStateType = typeof initialState;
type ThunkType = BaseThunkType<ActionsTypes>;

let usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
      case SET_FILTER:
        return {
          ...state,
          filter: action.filter,
        };
    default:
      return state;
  }
};

export const actions = {
  toggleFollowSucceded: (userId: number) =>
    ({
      type: TOGGLE_FOLLOWING,
      userId,
    } as const),
  setUsers: (users: Array<UserType>) => ({ type: SET_USERS, users } as const),
  setFilter: (filter: FilterType) => ({ type: SET_FILTER, filter } as const),
  setCurrentPage: (currentPage: number) =>
    ({
      type: SET_CURRENT_PAGE,
      currentPage,
    } as const),
  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: SET_TOTAL_USERS_COUNT,
      totalUsersCount,
    } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: TOGGLE_IS_FETCHING,
      isFetching,
    } as const),
  toggleFollowingProgress: (isFetching: boolean, userId: number) =>
    ({
      type: TOGGLE_IS_FOLLOWING_PROGRESS,
      isFetching,
      userId,
    } as const),
};

export const requestUsers = (currentPage: number, pageSize: number, term: string, friend: null | boolean): ThunkType => async (
  dispatch
) => {
  dispatch(actions.toggleIsFetching(true));
  dispatch(actions.setFilter({term, friend}))
  const data = await usersAPI.getUsers(currentPage, pageSize, term, friend);
  dispatch(actions.toggleIsFetching(false));
  dispatch(actions.setUsers(data.items));
  dispatch(actions.setTotalUsersCount(data.totalCount));
};

export const toggleFollow = (userId: number, followed: boolean): ThunkType => async (dispatch) => {
  dispatch(actions.toggleFollowingProgress(true, userId));
  let data = followed ? await usersAPI.unfollow(userId) : await usersAPI.follow(userId)
  if (data.resultCode === 0) {
    dispatch(actions.toggleFollowSucceded(userId));
  }
  dispatch(actions.toggleFollowingProgress(false, userId));
};

export default usersReducer;
