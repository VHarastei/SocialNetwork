import { connect } from 'react-redux';
import Dialogs from './Dialogs';
import { withAuthRedirect } from '../hoc/WithAuthRedirect';
import { compose } from 'redux';
import { DialogsType, MessagesType } from '../../types/types';
import { AppStateType } from '../../redux/reduxStore';
import { actions } from '../dialogsReducer';

// type MapStatePropsType = {
//   dialogs: Array<DialogsType>;
//   messages: Array<MessagesType>;
// };

// type MapDispatchPropsType = {
//   sendMessage: (newMessageText: string) => void;
// };

let mapStateToProps = (state: AppStateType) => {  return {
    dialogs: [],
    //state.dialogsPage.dialogs,
    messages: [],
    //state.dialogsPage.messages,
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, {...actions}),
  withAuthRedirect
)(Dialogs);
