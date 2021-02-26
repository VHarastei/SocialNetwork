import { getAuthUserData } from './authReducer';
import { InferActionsTypes, BaseThunkType } from './reduxStore';

//actions{} infer

const INITIALIZED_SUCCES = 'SocialNetwork/app/INITIALIZED_SUCCES';

let initialState = {
  initialized: false,
};

type ActionsTypes = InferActionsTypes<typeof actions>;
type InitialStateType = typeof initialState;
type ThunkType = BaseThunkType<ActionsTypes>;

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

export const actions = {
  initializedSucces: () => ({
    type: INITIALIZED_SUCCES,
  } as const)
}

export const initializeApp = (): ThunkType => async (dispatch) => {
  await dispatch(getAuthUserData());
  dispatch(actions.initializedSucces());
};

export default appReducer;
