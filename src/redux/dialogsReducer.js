const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
  dialogs: [
    { id: 1, name: 'biba' },
    { id: 2, name: 'boba' },
    { id: 3, name: 'booba' },
  ],
  messages: [
    { id: 1, message: 'nice' },
    { id: 2, message: 'cock' },
    { id: 3, message: 'bro' },
  ],
  newMessageText: '',
};

let dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      let newMessage = state.newMessageText;
      return {
        ...state,
        newMessageText: '',
        messages: [...state.messages, { id: 6, message: newMessage }],
      };

    case UPDATE_NEW_MESSAGE_TEXT:
      return { ...state, newMessageText: action.newText };

    default:
      return state;
  }
};

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageActionCreator = (text) => ({
  type: UPDATE_NEW_MESSAGE_TEXT,
  newText: text,
});

export default dialogsReducer;
