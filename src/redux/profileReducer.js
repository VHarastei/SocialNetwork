import { profileAPI } from '../api/api';

const ADD_POST = 'SocialNetwork/profile/ADD-POST';
const SET_USER_PROFILE = 'SocialNetwork/profile/SET_USER_PROFILE';
const SET_STATUS = 'SocialNetwork/profile/SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SocialNetwork/profile/SAVE_PHOTO_SUCCESS';

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
    case SAVE_PHOTO_SUCCESS: {
      return { ...state, profile: {...state.profile, photos: action.photos} };
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
export const savePhotoSuccess= (photos) => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
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

export const savePhoto = (file) => {
  return async (dispatch) => {
    const data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
      dispatch(savePhotoSuccess(data.data.photos)); 
    }
  };
};

export default profileReducer;
