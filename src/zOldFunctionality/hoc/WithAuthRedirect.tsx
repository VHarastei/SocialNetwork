import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../../redux/reduxStore';

// let mapStateToPropsForRedirect = (state) => {
//   return {
//     isAuth: state.auth.isAuth,
//   };
// };

// export const withAuthRedirect = (Component) => {
//   let RedirectComponent = (props) => {
//     if (!props.isAuth) return <Redirect to={'/login'} />;
//     return <Component {...props} />;
//   };
//   return connect(mapStateToPropsForRedirect)(RedirectComponent);
// };

let mapStateToPropsForRedirect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});
type MapStatePropsType = ReturnType<typeof mapStateToPropsForRedirect>;

export const withAuthRedirect = (Component: ComponentType) => {
  class RedirectComponent extends React.Component<MapStatePropsType> {
    render() {
      if (!this.props.isAuth) return <Redirect to={'/login'} />;

      return <Component {...this.props} />;
    }
  }
  return connect(mapStateToPropsForRedirect)(RedirectComponent);
};
