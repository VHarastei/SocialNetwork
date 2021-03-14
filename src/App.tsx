import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import Preloader from './components/common/Preloader/Preloader';
import SignIn from './components/SignInPage/SignInPage';
import { NavBar } from './components/NavBar/NavBar';
import { initializeApp } from './redux/appReducer';
import { AppStateType } from './redux/reduxStore';
const MyProfilePage = React.lazy(() => import('./components/ProfilePage/MyProfilePage'));
const ChatPage = React.lazy(() => import('./pages/ChatPage/ChatPage'));
const FindPeoplePage = React.lazy(() => import('./components/Users/FindPeoplePage'));
const Friends = React.lazy(() => import('./components/Friends/Friends'));

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void;
};
class App extends React.Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    if (!this.props.isAuth) {
      return <SignIn />;
    }
    return (
      <div className="app-wrapper">
        <NavBar />
        <Suspense fallback={<Preloader />}>
          <div className="app-wrapper-content">
            <Switch>
              <Route path="/" exact>
                <Redirect to="/profile" />
              </Route>
              <Route path="/profile/:userId?" render={() => <MyProfilePage />} />
              <Route path="/chat" render={() => <ChatPage />} />
              <Route path="/friends/:userId?" render={() => <Friends />} />
              <Route  path="/people/:userId?" render={() => <FindPeoplePage />} />
              
              <Route path="*" render={() => <div>404 NOT FOUND </div>} />
              {/* <Redirect exact from="/" to="/profile" /> */}
            </Switch>
          </div>
        </Suspense>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
  isAuth: state.auth.isAuth,
});

export default compose(connect(mapStateToProps, { initializeApp })(App));
