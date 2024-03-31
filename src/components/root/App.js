import React, { Component } from 'react';
import Home from '../home/Home';
import { Routes, Route, Navigate, Router } from 'react-router-dom';
import ErrorPage from '../common/ErrorPage';
import { connect } from 'react-redux'
import Profile from '../profiles/Profile';
import Channel from '../channel/Channel';
import NotFound from '../common/NotFound';
import { bindActionCreators } from 'redux';
import Navi from '../navi/Navi';
import ProfileSettings from '../profiles/ProfileSettings';
import ChannelSettings from '../channel/ChannelSettings';
import Forbid from '../common/Forbid';
import BadRequest from '../common/BadRequest';
import Register from '../auth/Register';
import Login from '../auth/Login';
import UserChannels from '../profiles/UserChannels';
import * as authAsyncActions from '../../redux/actions/auth/authAsyncActions'
import { getUserIsOwnerSuccess } from '../../redux/actions/user/userActionsCreators'
import Loading from '../common/Loading';
import { Container} from 'react-bootstrap';
import { ToastContainer } from "react-toastify";
import { profileFlowState } from '../../redux/constants/constants';
import ErrorBoundary from '../toolbox/ErrorBoundary';
import withRouter from '../../redux/helpers/withRouter';

class App extends Component {

  componentDidMount() {
    this.props.actions.getCurrentUser();
    console.log(this.props)
  }

  render() {
    return (
      <div className="App">
        <Navi />
          <Container fluid>
          <Routes>
              <Route
                exact
                path="/"
                element={<Navigate to="/feed" />}
              />
              <Route
                exact
                path="/feed"
                element={<ErrorBoundary><Home /></ErrorBoundary>}
              />
              <Route
                exact
                path="/feed/:text"
                element={<ErrorBoundary><Home /></ErrorBoundary>}
              />
              <Route
                exact
                path="/login"
                element={
                  this.props.isLogged ? <Navigate to="/" /> : <ErrorBoundary><Login /></ErrorBoundary>
                }
              />
              <Route
                exact
                path="/register"
                element={
                  this.props.isLogged ? <Navigate to="/" /> : <ErrorBoundary><Register /></ErrorBoundary>
                }
              />
              <Route path="/errorpage" element={<ErrorPage />} />
              <Route
                exact
                path="/profile/me"
                element={<Navigate to={`/profile/me/${profileFlowState.Photos}`} />}
              />
              <Route
                exact
                path="/profile/me/photos"
                element={
                  this.props.currentUser.isLoading
                    ? <Loading />
                    : (
                      this.props.isLogged
                        ? <ErrorBoundary><Profile to={`/profile/me/${profileFlowState.Photos}`} flowState={profileFlowState.Photos} /></ErrorBoundary>
                        : <Navigate to="/" />
                    )
                }
              />
              <Route
                exact
                path="/profile/me/comments"
                element={
                  this.props.currentUser.isLoading
                    ? <Loading />
                    : (
                      this.props.isLogged
                        ? <ErrorBoundary><Profile to={`/profile/me/${profileFlowState.Comments}`} flowState={profileFlowState.Comments} /></ErrorBoundary>
                        : <Navigate to="/" />
                    )
                }
              />
              <Route
                exact
                path="/profile/me/likes"
                element={
                  this.props.currentUser.isLoading
                    ? <Loading />
                    : (
                      this.props.isLogged
                        ? <ErrorBoundary><Profile to={`/profile/me/${profileFlowState.Likes}`} flowState={profileFlowState.Likes} /></ErrorBoundary>
                        : <Navigate to="/" />
                    )
                }
              />
              {/* Other profile routes */}
              <Route
                exact
                path="/profile/:id"
                element={<Navigate to={`/profile/${this.props.currentUser.detail.id}/${profileFlowState.Photos}`} />}
              />
              <Route
                exact
                path="/profile/:id/photos"
                element={
                  this.props.currentUser.detail.id 
                    ? <Navigate to={`/profile/me/${profileFlowState.Photos}`} />
                    : <ErrorBoundary><Profile flowState={profileFlowState.Photos} /></ErrorBoundary>
                }
              />
              <Route
                exact
                path="/profile/:id/comments"
                element={
                  this.props.currentUser.detail.id
                    ? <Navigate to={`/profile/me/${profileFlowState.Comments}`} />
                    : <ErrorBoundary><Profile flowState={profileFlowState.Comments} /></ErrorBoundary>
                }
              />
              <Route
                exact
                path="/profile/:id/likes"
                element={
                  this.props.currentUser.detail.id
                    ? <Navigate to={`/profile/me/${profileFlowState.Likes}`} />
                    : <ErrorBoundary><Profile flowState={profileFlowState.Likes} /></ErrorBoundary>
                }
              />
              <Route
                exact
                path="/profile/me/settings"
                element={
                  this.props.currentUser.isLoading
                    ? <Loading />
                    : (
                      this.props.isLogged
                        ? <ErrorBoundary><ProfileSettings /></ErrorBoundary>
                        : null
                    )
                }
              />
              <Route
                exact
                path="/profile/:id/channels"
                element={
                  this.props.currentUser.isLoading
                    ? <Loading />
                    : <ErrorBoundary><UserChannels /></ErrorBoundary>
                }
              />
              <Route exact path="/channel/:id" element={<ErrorBoundary><Channel /></ErrorBoundary>} />
              <Route exact path="/channel/:id/settings" element={<ErrorBoundary><ChannelSettings /></ErrorBoundary>} />
              <Route exact path="/notfound" element={<NotFound />} />
              <Route exact path="/forbidden" element={<Forbid />} />
              <Route exact path="/badrequest" element={<BadRequest />} />
              <Route exact path="*" element={<NotFound />} />
            </Routes>
          </Container>
          <ToastContainer autoClose={5000} />
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCurrentUser: bindActionCreators(authAsyncActions.getCurrentUserApi, dispatch),
      getUserIsOwner: bindActionCreators(getUserIsOwnerSuccess, dispatch),
      logout: bindActionCreators(authAsyncActions.logoutApi, dispatch)

    }
  }
}
function mapStateToProps(state) {
  return {
    currentUser: state.currentUserReducer,
    isLoading: state.isLoadingReducer,
    isLogged: state.isLoggedReducer,
    router: state.router,
    params: state.params
    
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));


