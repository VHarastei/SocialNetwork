import { profileAPI } from '../api/profileAPI';
import { ProfileType } from './../types/types';
import { BaseThunkType, InferActionsTypes } from './reduxStore';

const SET_PEOPLE_PROFILE = 'SocialNetwork/peopleProfile/SET_PEOPLE_PROFILE';
const SET_STATUS = 'SocialNetwork/peopleProfile/SET_STATUS';

const initialState = {
  profile: null as ProfileType | null,
  status: '',
};

type ActionsTypes = InferActionsTypes<typeof actions>;
type InitialStateType = typeof initialState;
type ThunkType = BaseThunkType<ActionsTypes, void>;

export let peopleProfileReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case SET_PEOPLE_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  setPeopleProfile: (profile: any) =>
    ({
      type: SET_PEOPLE_PROFILE,
      profile,
    } as const),
  setStatus: (status: string) =>
    ({
      type: SET_STATUS,
      payload: { status },
    } as const),
};

export const getPeopleProfile = (userId: number): ThunkType => (dispatch) => {
  const profile = profileAPI.getProfile(userId);
  const status = profileAPI.getStatus(userId);
  Promise.all([profile, status]).then(([profile, status]) => {
    dispatch(actions.setPeopleProfile(profile));
    dispatch(actions.setStatus(status));
  });
};
// export const getPeopleProfile = (userId: number): ThunkType => async (dispatch) => {
//   const profile = await profileAPI.getProfile(userId);
//   dispatch(actions.setPeopleProfile(profile));
//   const status = await profileAPI.getStatus(userId);
//   dispatch(actions.setStatus(status));
// };

export const deletePeopleProfile = (): ThunkType => (dispatch) => {
  dispatch(actions.setPeopleProfile(null));
  dispatch(actions.setStatus(''));
};
