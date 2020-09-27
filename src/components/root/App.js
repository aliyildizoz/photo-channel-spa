import React, { Component } from 'react';
import Home from '../home/Home';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
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
export default class App extends Component {

  render() {

    return (
      <div className="App bg-gradient-dark " >
        <Navi />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/errorpage" component={ErrorPage} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/profile/:id/settings" component={ProfileSettings} />
          <Route exact path="/channel/:id" component={Channel} />
          <Route exact path="/channel/:id/settings" component={ChannelSettings} />
          <Route exact path="/notfound" component={NotFound} />
          <Route exact path="/forbidden" component={Forbid} />
          <Route exact path="/badrequest" component={BadRequest} />
          <Route component={NotFound} />
        </Switch>

      </div>
    )
  }
}


