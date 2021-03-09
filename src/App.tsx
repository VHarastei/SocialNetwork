import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import Preloader from './components/common/Preloader/Preloader';
import SignIn from './components/Login/LoginNew';
import { HeaderNav } from './components/NavBar/NavBarNew';
import { PeopleProfile } from './components/Users/PeopleProfile/PeopleProfile';
import { initializeApp } from './redux/appReducer';
import { AppStateType } from './redux/reduxStore';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const ChatPage = React.lazy(() => import('./pages/ChatPage/ChatPage'));
const FindPeople = React.lazy(() => import('./components/Users/Users'));
const Login = React.lazy(() => import('./components/Login/Login'));
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
        <HeaderNav />
        <Suspense fallback={<Preloader />}>
          <div className="app-wrapper-content">
            <Switch>
              <Route path="/" exact>
                <Redirect to="/profile" />
              </Route>
              <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
              <Route path="/chat" render={() => <ChatPage />} />
              <Route path="/friends/:userId?" render={() => <Friends />} />
              <Route exact path="/people" render={() => <FindPeople />} />
              <Route
                path="/people/:userId"
                render={() => <PeopleProfile backBtnPath={'people'} />}
              />
              <Route path="/login" render={() => <Login />} />
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
