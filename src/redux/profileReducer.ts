import { PhotosType, PostsType, ProfileType } from './../types/types';
import { profileAPI } from '../api/api';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './reduxStore';

const ADD_POST = 'SocialNetwork/profile/ADD-POST';
const SET_USER_PROFILE = 'SocialNetwork/profile/SET_USER_PROFILE';
const SET_STATUS = 'SocialNetwork/profile/SET_STATUS';
const SET_STATUS_ERROR = 'SocialNetwork/profile/SET_STATUS_ERROR';
const SAVE_PHOTO_SUCCESS = 'SocialNetwork/profile/SAVE_PHOTO_SUCCESS';

const initialState = {
  posts: [
    { id: 1, message: '111 Post', likesCount: 2 },
    { id: 2, message: '22Post', likesCount: 5 },
    { id: 3, message: '111432 Post', likesCount: 8 },
    { id: 4, message: '11121 Post', likesCount: 5 },
  ] as Array<PostsType>,
  profile: null as ProfileType | null,
  status: null as string | null,
  statusError: null as string | null,
  newPostText: '',
};

type ActionsTypes =
  | AddPostType
  | SetUserProfileType
  | SetStatusType
  | setStatusErrorType
  | savePhotoSuccessType;

type InitialStateType = typeof initialState;
let profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_STATUS:
    case SET_STATUS_ERROR: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      };
      //photos: action.photos
    }
    default:
      return state;
  }
};

type AddPostType = {
  type: typeof ADD_POST;
  newPostText: string;
};
export const addPost = (newPostText: string): AddPostType => ({
  type: ADD_POST,
  newPostText,
});

// type SetUserProfilePayloadType = {
//   profile: ProfileType
// };

type SetUserProfileType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({
  type: SET_USER_PROFILE,
  profile,
});

type SetStatusType = {
  type: typeof SET_STATUS;
  payload: { status: string | null };
};
export const setStatus = (status: string | null): SetStatusType => ({
  type: SET_STATUS,
  payload: { status },
});

type setStatusErrorType = {
  type: typeof SET_STATUS_ERROR;
  payload: { statusError: string | null };
};
export const setStatusError = (statusError: string | null): setStatusErrorType => ({
  type: SET_STATUS_ERROR,
  payload: { statusError },
});

type savePhotoSuccessType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photos: PhotosType;
};
export const savePhotoSuccess = (photos: PhotosType): savePhotoSuccessType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(data));
};

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getStatus(userId);
  dispatch(setStatus(data));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
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

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  const data = await profileAPI.savePhoto(file);
  if (data.resultCode === 0) {
    dispatch(savePhotoSuccess(data.data.photos));
  }
};

export const saveProfile = (
  profile: ProfileType
): ThunkAction<Promise<any>, AppStateType, unknown, ActionsTypes> => async (dispatch, getState) => {
  const userId = getState().auth.userId as number;
  const data = await profileAPI.saveProfile(profile);
  if (data.resultCode === 0) {
    dispatch(getUserProfile(userId));
  }
  return data;
};

export default profileReducer;
