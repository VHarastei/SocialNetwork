import { v1 } from 'uuid';
import { chatAPI, ChatMessageAPIType, StatusType } from './../api/chatAPI';
import { BaseThunkType, InferActionsTypes } from './reduxStore';

const MESSAGES_RECEIVED = 'SocialNetwork/chat/MESSAGES_RECEIVED';
const STATUS_CHANGED = 'SocialNetwork/chat/STATUS_CHANGED';
const CLEAR_MESSAGES = 'SocialNetwork/chat/CLEAR_MESSAGES';

type ChatMessageType = ChatMessageAPIType & { id: string };

let initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType,
};

type ActionsTypes = InferActionsTypes<typeof actions>;
type InitialStateType = typeof initialState;
type ThunkType = BaseThunkType<ActionsTypes>;

let chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case MESSAGES_RECEIVED:
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.payload.messages.map((m) => ({ ...m, id: v1() })),
        ].filter((m, index, arr) => index >= arr.length - 100),
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        messages: [],
      };
    case STATUS_CHANGED:
      return {
        ...state,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export const actions = {
  messageReceived: (messages: ChatMessageAPIType[]) =>
    ({
      type: MESSAGES_RECEIVED,
      payload: { messages },
    } as const),
  clearMessages: () =>
    ({
      type: CLEAR_MESSAGES,
    } as const),
  statusChanged: (status: StatusType) =>
    ({
      type: STATUS_CHANGED,
      payload: { status },
    } as const),
};

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null;
const newMessageHandlerCreactor = (dispatch: any) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messageReceived(messages));
    };
  } else {
    dispatch(actions.messageReceived([]));
  }
  return _newMessageHandler;
};

let _statusChangedHandler: ((status: StatusType) => void) | null = null;
const statusChangedHandlerCreator = (dispatch: any) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(actions.statusChanged(status));
    };
  }
  return _statusChangedHandler;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.subscribe('messagesReceived', newMessageHandlerCreactor(dispatch));
  chatAPI.subscribe('statusChanged', statusChangedHandlerCreator(dispatch));
  chatAPI.start();
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe('messagesReceived', newMessageHandlerCreactor(dispatch));
  chatAPI.unsubscribe('statusChanged', statusChangedHandlerCreator(dispatch));
  dispatch(actions.clearMessages())
  chatAPI.stop();
};
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
  chatAPI.sendMessage(message);
};

export default chatReducer;
