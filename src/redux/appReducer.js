import { getAuthUserData } from './authReducer';

const INITIALIZED_SUCCES = 'SocialNetwork/app/INITIALIZED_SUCCES';

let initialState = {
  initialized: false,
};

let appReducer = (state = initialState, action) => {
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

export const initializedSucces = () => ({
  type: INITIALIZED_SUCCES,
});

export const initializeApp = () => {
  return async (dispatch) => {
    await dispatch(getAuthUserData());
    dispatch(initializedSucces());
  };
};

export default appReducer;
