import { PhotosType, PostsType, ProfileType } from './../types/types';
import { profileAPI } from '../api/profileAPI';
import { InferActionsTypes, BaseThunkType } from './reduxStore';

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
  status: '',
  statusError: ''
};

type ActionsTypes = InferActionsTypes<typeof actions>;
type InitialStateType = typeof initialState;
type ThunkType = BaseThunkType<ActionsTypes>;

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
        profile: { ...state.profile, photos: action.photos } as ProfileType
      };
    }
    default:
      return state;
  }
};

export const actions = {
  addPost: (newPostText: string) =>
    ({
      type: ADD_POST,
      newPostText,
    } as const),
  setUserProfile: (profile: any) =>
    ({
      type: SET_USER_PROFILE,
      profile,
    } as const),
  setStatus: (status: string) =>
    ({
      type: SET_STATUS,
      payload: { status },
    } as const),
  setStatusError: (statusError: string) =>
    ({
      type: SET_STATUS_ERROR,
      payload: { statusError },
    } as const),
  savePhotoSuccess: (photos: PhotosType) =>
    ({
      type: SAVE_PHOTO_SUCCESS,
      photos,
    } as const),
};

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getProfile(userId);
  dispatch(actions.setUserProfile(data));
};

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getStatus(userId);
  dispatch(actions.setStatus(data));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  try {
    const data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
      dispatch(actions.setStatus(status));
      dispatch(actions.setStatusError(''));
    } else {
      dispatch(actions.setStatusError(data.messages[0]));
    }
  } catch (err) {
    dispatch(actions.setStatusError(err.message));
  }
};

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  const data = await profileAPI.savePhoto(file);
  if (data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(data.data.photos));
  }
};

export const saveProfile = (
  profile: ProfileType
): BaseThunkType<ActionsTypes, Promise<any>> => async (dispatch, getState) => {
  const userId = getState().auth.userId as number;
  const data = await profileAPI.saveProfile(profile);
  if (data.resultCode === 0) {
    dispatch(getUserProfile(userId));
  }
  return data;
};

export default profileReducer;
