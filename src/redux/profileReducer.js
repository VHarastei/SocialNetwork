import { profileAPI } from '../api/api';

const ADD_POST = 'SocialNetwork/profile/ADD-POST';
const SET_USER_PROFILE = 'SocialNetwork/profile/SET_USER_PROFILE';
const SET_STATUS = 'SocialNetwork/profile/SET_STATUS';

let initialState = {
  posts: [
    { id: 1, message: '111 Post', likesCount: 2 },
    { id: 2, message: '22Post', likesCount: 5 },
    { id: 3, message: '111432 Post', likesCount: 8 },
    { id: 4, message: '11121 Post', likesCount: 5 },
  ],
  profile: null,
  status: '',
};

let profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: '',
      };
    }
    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile };
    }
    case SET_STATUS: {
      return { ...state, status: action.status };
    }
    default:
      return state;
  }
};

export const addPostActionCreator = (newPostText) => ({
  type: ADD_POST,
  newPostText,
});
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
export const setStatus = (status) => ({
  type: SET_STATUS,
  status,
});

export const getUserProfile = (userId) => {
  return async (dispatch) => {
    const data = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(data));
  };
};

export const getStatus = (userId) => {
  return async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(setStatus(data));
  };
};

export const updateStatus = (status) => {
  return async (dispatch) => {
    const data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) dispatch(setStatus(status));
  };
};

export default profileReducer;
