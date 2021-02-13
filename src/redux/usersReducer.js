import { usersAPI } from '../api/api';

const TOGGLE_FOLLOWING = 'SocialNetwork/users/TOGGLE_FOLLOWING';
const SET_USERS = 'SocialNetwork/users/SET_USERS';
const SET_CURRENT_PAGE = 'SocialNetwork/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SocialNetwork/users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'SocialNetwork/users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS =
  'SocialNetwork/users/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [],
};

let usersReducer = (state = initialState, action) => {
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
        totalUsersCount: action.totalUsersCount / 100,
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

export const toggleFollowSucceded = (userId) => ({
  type: TOGGLE_FOLLOWING,
  userId,
});
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
export const setTotalUsersCount = (totalUsersCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount,
});
export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});
export const toggleFollowingProgress = (isFetching, userId) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

export const requestUsers = (currentPage, pageSize) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };
};

export const toggleFollow = (userId, followed) => {
  return async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId));
    let data = followed
      ? await usersAPI.unfollow(userId)
      : await usersAPI.follow(userId);
    if (data.resultCode === 0) {
      dispatch(toggleFollowSucceded(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
  };
};

export default usersReducer;
