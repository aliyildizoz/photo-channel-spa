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
import { bindActionCreators } from 'redux';
import Navi from '../navi/Navi';
import ProfileSettings from '../profiles/ProfileSettings';
import Subscriptions from '../profiles/Subscriptions';
import ChannelSettings from '../channel/ChannelSettings';
import loginHook from "../auth/loginHook"
export default class App extends Component {
  
  render() {

    return (
      <div className="App bg-gradient-dark " >
        <Navi currentUser={this.props.currentUser} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={loginHook} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/errorpage" component={ErrorPage} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/profile/:id/settings" component={ProfileSettings} />
          <Route exact path="/profile/:id/subscriptions" component={Subscriptions} />
          <Route exact path="/channel/:id" component={ChannelDetail} />
          <Route exact path="/channel/:id/settings" component={ChannelSettings} />
          <Route exact path="/notfound" component={NotFound} />
          <Route component={NotFound} />
        </Switch>

      </div>
    )
  }
}


