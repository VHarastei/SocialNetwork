import { profileAPI } from '../api/api';

const ADD_POST = 'SocialNetwork/profile/ADD-POST';
const SET_USER_PROFILE = 'SocialNetwork/profile/SET_USER_PROFILE';
const SET_STATUS = 'SocialNetwork/profile/SET_STATUS';
const SET_STATUS_ERROR = 'SocialNetwork/profile/SET_STATUS_ERROR';
const SAVE_PHOTO_SUCCESS = 'SocialNetwork/profile/SAVE_PHOTO_SUCCESS';

let initialState = {
  posts: [
    { id: 1, message: '111 Post', likesCount: 2 },
    { id: 2, message: '22Post', likesCount: 5 },
    { id: 3, message: '111432 Post', likesCount: 8 },
    { id: 4, message: '11121 Post', likesCount: 5 },
  ],
  profile: null,
  status: null,
  statusError: null,
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
    case SET_USER_PROFILE:
    case SET_STATUS:
    case SET_STATUS_ERROR: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case SAVE_PHOTO_SUCCESS: {
      return { ...state, profile: { ...state.profile, photos: action.photos } };
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
  payload: { profile },
});
export const setStatus = (status) => ({
  type: SET_STATUS,
  payload: { status },
});
export const setStatusError = (statusError) => ({
  type: SET_STATUS,
  payload: { statusError },
});
export const savePhotoSuccess = (photos) => ({
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

export const updateStatus = (status) => async (dispatch) => {
  try {
    const data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
      dispatch(setStatus(status));
      dispatch(setStatusError(null));
    } else {
      dispatch(setStatusError(data.messages[0]));
    }
  } catch (err) {
    dispatch(setStatusError(err.message));
  }
};

export const savePhoto = (file) => {
  return async (dispatch) => {
    const data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
      dispatch(savePhotoSuccess(data.data.photos));
    }
  };
};

export const saveProfile = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  const data = await profileAPI.saveProfile(profile);
  if (data.resultCode === 0) {
    dispatch(getUserProfile(userId));
  }
  return data;
};

export default profileReducer;
