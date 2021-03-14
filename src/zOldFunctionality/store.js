import dialogsReducer from '../redux/dialogsReducer';
import profileReducer from '../redux/profileReducer';
import sidebarReducer from './sidebarReducer';

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
    sidebar: {
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
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._callSubscriber(this._state);
  },
};
