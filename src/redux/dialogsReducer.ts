import { DialogsType, MessagesType } from '../types/types';

const SEND_MESSAGE = 'SocialNetwork/dialog/SEND_MESSAGE';

let initialState = {
  dialogs: [
    { id: 1, name: 'biba' },
    { id: 2, name: 'boba' },
    { id: 3, name: 'booba' },
  ] as Array<DialogsType>,
  messages: [
    { id: 1, message: 'nice' },
    { id: 2, message: 'cock' },
    { id: 3, message: 'bro' },
  ] as Array<MessagesType>,
  newMessageText: '',
};

type InitialStateType = typeof initialState;

let dialogsReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, { id: 6, message: action.newMessageText }],
      };
    default:
      return state;
  }
};

type SendMessageType = {
  type: typeof SEND_MESSAGE;
  newMessageText: string;
};

export const sendMessage = (newMessageText: string): SendMessageType => ({
  type: SEND_MESSAGE,
  newMessageText,
});

export default dialogsReducer;
