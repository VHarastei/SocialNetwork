import { chatAPI, ChatMessageType } from './../api/chatAPI';
import { ResultCodeCaptchaEnum } from './../api/api';
import { ResultCodesEnum } from '../api/api';
import { securityAPI } from '../api/securityAPI';
import { authAPI } from '../api/authAPI';
import { InferActionsTypes, BaseThunkType } from './reduxStore';
import { getUserProfile } from './profileReducer';
import { Dispatch } from 'react';

const MESSAGES_RECEIVED = 'SocialNetwork/chat/MESSAGES_RECEIVED';

let initialState = {
  messages: [] as ChatMessageType[],
};

type ActionsTypes = InferActionsTypes<typeof actions>;
type InitialStateType = typeof initialState;
type ThunkType = BaseThunkType<ActionsTypes>;

let chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case MESSAGES_RECEIVED:
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages],
      };
    default:
      return state;
  }
};

export const actions = {
  messageReceived: (messages: ChatMessageType[]) => ({
    type: MESSAGES_RECEIVED,
    payload: { messages },
  }),
};

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;
const newMessageHandlerCreactor = (dispatch: any) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messageReceived(messages));
    };
  }
  return _newMessageHandler;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.subscribe(newMessageHandlerCreactor(dispatch));
  chatAPI.start();
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe(newMessageHandlerCreactor(dispatch));
  chatAPI.stop();
};
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
  chatAPI.sendMessage(message);
};

export default chatReducer;
