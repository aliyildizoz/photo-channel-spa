import React, { Component } from 'react';
import Home from '../home/Home';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import Login from '../auth/Login';
import ErrorPage from '../common/ErrorPage';
import { connect } from 'react-redux'
import Register from '../auth/Register';
import Profile from '../profiles/Profile';
import ChannelDetail from '../channel/ChannelDetail';
import NotFound from '../common/NotFound';
import ChannelAbout from '../channel/ChannelAbout';
import { bindActionCreators } from 'redux';
import * as authActions from "../../redux/actions/authActions"
import Navi from '../navi/Navi';
import ProfileSettings from '../profiles/ProfileSettings';

class App extends Component {

  componentDidMount = () => {
    console.log("object")
    this.props.actions.getLoggedUser();
  }

  render() {

    return (
      <div className="App" >
        <Navi />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/errorpage" component={ErrorPage} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/profile/:id/settings" component={ProfileSettings} />
          <Route sensitive path="/channel/:id" component={ChannelDetail} />
          <Route exact path="/channelabout/:id" render={props => (
            <ChannelAbout channelId={props.match.params.id}></ChannelAbout>
          )} />
          <Route exact path="/notfound" component={NotFound} />
          <Route component={NotFound} />
        </Switch>

      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    erorr: state.authReducer,
    loggedUser: state.authReducer.loggedUser
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getLoggedUser: bindActionCreators(authActions.getLoggedUserApi, dispatch)
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

