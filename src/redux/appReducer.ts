import { getAuthUserData } from './authReducer';

const INITIALIZED_SUCCES = 'SocialNetwork/app/INITIALIZED_SUCCES';

let initialState = {
  initialized: false,
};

type InitialStateType = typeof initialState;

let appReducer = (state = initialState, action: any): InitialStateType => {
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

export const initializeApp = () => {
  return async (dispatch: any) => {
    await dispatch(getAuthUserData());
    dispatch(initializedSucces());
  };
};

export default appReducer;
