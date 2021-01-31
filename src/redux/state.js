const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

export let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: '111 Post', likesCount: 2 },
        { id: 2, message: '22Post', likesCount: 5 },
        { id: 3, message: '111432 Post', likesCount: 8 },
        { id: 4, message: '11121 Post', likesCount: 5 },
      ],
      newPostText: 'oh shit am sorry',
    },
    dialogsPage: {
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
      newMessageText: 'hi',
    },
    sideBar: {
      friends: [
        { id: 1, name: 'biba' },
        { id: 2, name: 'boba' },
        { id: 3, name: 'booba' },
      ],
    },
  },
  _callSubscriber() {
    console.log('no subcribers');
  },
  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },
  dispatch(action) {
    if (action.type === ADD_POST) {
      let newPost = {
        id: 5,
        message: this._state.profilePage.newPostText,
        likesCount: 0,
      };
      this._state.profilePage.posts.push(newPost);
      this._state.profilePage.newPostText = '';
      this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_POST_TEXT) {
      this._state.profilePage.newPostText = action.newText;
      this._callSubscriber(this._state);
    } else if (action.type === ADD_MESSAGE) {
      let newMessage = {
        id: 5,
        message: this._state.dialogsPage.newMessageText,
      };
      this._state.dialogsPage.messages.push(newMessage);
      this._state.dialogsPage.newMessageText = '';
      this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
      this._state.dialogsPage.newMessageText = action.newText;
      this._callSubscriber(this._state);
    }
  },
};

export const addPostActionCreator = () => ({ type: ADD_POST });
export const updateNewPostActionCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text,
});
export const addMessageActionCreator = () => ({ type: ADD_MESSAGE });
export const updateNewMessageActionCreator = (text) => ({
  type: UPDATE_NEW_MESSAGE_TEXT,
  newText: text,
});
