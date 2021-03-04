import './App.css';
import React, { Suspense } from 'react';
import NavBar from './components/NavBar/NavBar';
import { Route, Switch, Redirect } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import { initializeApp } from './redux/appReducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import { AppStateType } from './redux/reduxStore';
import { PeopleProfile } from './components/Users/PeopleProfile/PeopleProfile';
import {HeaderNav} from './components/NavBar/NavBarNew';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UserPage = React.lazy(() => import('./components/Users/UsersContainer'))
const Login = React.lazy(() => import('./components/Login/Login'));

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <div className="app-wrapper">
        <HeaderNav />
        {/* <HeaderContainer /> */}
        {/* <NavBar /> */}
        <Suspense fallback={<Preloader />}>
          <div className="app-wrapper-content">
            <Switch>
              <Route path="/" exact>
                <Redirect to="/profile" />
              </Route>
              <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
              <Route path="/dialogs" render={() => <DialogsContainer />} />
              <Route exact path="/users" render={() => <UserPage />} />
              <Route path="/users/:userId" render={() => <PeopleProfile />} />

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
});

export default compose(connect(mapStateToProps, { initializeApp })(App));
