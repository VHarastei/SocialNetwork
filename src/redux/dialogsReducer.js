const SEND_MESSAGE = 'SocialNetwork/dialog/SEND-MESSAGE';

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
      return {
        ...state,
        messages: [
          ...state.messages,
          { id: 6, message: action.newMessageText },
        ],
      };
    default:
      return state;
  }
};

export const sendMessageCreator = (newMessageText) => ({
  type: SEND_MESSAGE,
  newMessageText,
});

export default dialogsReducer;
