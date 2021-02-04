import React from 'react';
import { connect } from 'react-redux';
import {
  sendMessageCreator,
  updateNewMessageActionCreator,
} from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';

// const DialogsContainer = (props) => {
//   let state = props.store.getState().dialogsPage;

//   let onSendMessageClick = () => {
//     props.store.dispatch(sendMessageCreator()); //container sendMessage 34:50
//   };

//   let onMessageChange = (text) => {
//     props.store.dispatch(updateNewMessageActionCreator(text));
//   };

//   return (
//     <Dialogs
//       dialogsPage={state}
//       sendMessage={onSendMessageClick}
//       messageChange={onMessageChange}
//     />
//   );
// };

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: () => {
      dispatch(sendMessageCreator());
    },
    messageChange: (text) => {
      dispatch(updateNewMessageActionCreator(text));
    },
  };
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;