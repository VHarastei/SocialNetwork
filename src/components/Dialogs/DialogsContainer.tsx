import { connect } from 'react-redux';
import Dialogs from './Dialogs';
import { withAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';
import { DialogsType, MessagesType } from '../../types/types';
import { AppStateType } from '../../redux/reduxStore';
import { sendMessage } from '../../redux/dialogsReducer';

type MapStatePropsType = {
  dialogs: Array<DialogsType>;
  messages: Array<MessagesType>;
};

type MapDispatchPropsType = {
  sendMessage: (newMessageText: string) => void;
};

let mapStateToProps = (state: AppStateType) => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
  };
};

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    sendMessage,
  }),
  withAuthRedirect
)(Dialogs);
