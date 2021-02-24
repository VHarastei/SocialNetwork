import { ThunkAction } from 'redux-thunk';
import { getAuthUserData } from './authReducer';
import { AppStateType } from './reduxStore';

const INITIALIZED_SUCCES = 'SocialNetwork/app/INITIALIZED_SUCCES';

let initialState = {
  initialized: false,
};

type ActionsTypes = InitializedSuccesType;

type InitialStateType = typeof initialState;
let appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCES:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

type InitializedSuccesType = {
  type: typeof INITIALIZED_SUCCES;
};

export const initializedSucces = (): InitializedSuccesType => ({
  type: INITIALIZED_SUCCES,
});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const initializeApp = (): ThunkType => async (dispatch) => {
  await dispatch(getAuthUserData());
  dispatch(initializedSucces());
};

export default appReducer;
