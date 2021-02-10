import { getAuthUserData } from './authReducer';

const INITIALIZED_SUCCES = 'INITIALIZED_SUCCES';

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
      
    // setTimeout(() => {
    //   dispatch(initializedSucces());
    // }, 500)
  };
};

export default appReducer;
