import React, { Component } from 'react';
import Home from '../home/Home';
import { Switch, Route, Router, Redirect, Link } from 'react-router-dom';
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
import { getChannelIsOwnerApi } from '../../redux/actions/channel/channelAsyncActions';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';

class App extends Component {

  componentDidMount() {
    this.props.actions.getCurrentUser()
  }
  // asyncGetChannelIsOwner = async (channelId, history) => await this.props.actions.getChannelIsOwner(channelId, history)
  render() {

    return (
      <div className="App" >
        
        <Navi />


        <Container fluid  >

          <Switch >
            <Route exact path="/" render={(props) => {
              return <Home match={props.match} />
            }} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/errorpage" component={ErrorPage} />
            <Route exact path="/profile/:id" render={(props) => {
              this.props.actions.getUserIsOwner(this.props.currentUser.id == props.match.params.id);
              return <Profile {...props} />
            }} />
            <Route exact path="/profile/:id/settings" render={(props) => {
              var urlId = props.match.params.id;
              return this.props.currentUserIsLoading ?
                <Loading /> : this.props.currentUser.id == urlId ? < ProfileSettings {...props} /> : <Redirect to={"/profile/" + urlId} />;
            }
            } />
            <Route exact path="/profile/:id/channels" render={(props) => {
              if (this.props.currentUser.currentUserIsLoading) {
                return <Loading />
              } else {
                var urlId = props.match.params.id;
                var isOwner = false;
                if (this.props.currentUser.id == urlId) isOwner = true;

                this.props.actions.getUserIsOwner(isOwner);
                return <UserChannels {...props} />
              }
            }} />
            <Route exact path="/channel/:id" component={Channel} />
            <Route exact path="/channel/:id/settings" component={ChannelSettings} />
            <Route exact path="/notfound" component={NotFound} />
            <Route exact path="/forbidden" component={Forbid} />
            <Route exact path="/badrequest" component={BadRequest} />
            <Route component={NotFound} />
          </Switch>
        </Container>

        <footer className="bg-dark text-light mt-5">
          <Container>
            <Row className="pb-5 pt-5">
              <Col md={{span:4,offset:2}}>
                <ul>
                  <h3>Site haritası</h3><hr className="bg-light" />
                  <li><Link className="text-decoration-none"> Giriş</Link></li>
                  <li><Link className="text-decoration-none"> Uye ol</Link></li>
                  <li><Link className="text-decoration-none">Ana sayfa</Link></li>
                </ul>
              </Col>
              <Col md={{span:4}}>
                <ul >
                  <h3>En popüler</h3><hr className="bg-light" />
                  <li><i class="fas fa-star "></i> Kanallar</li>
                  <li><i class="fas fa-star "></i> Fotoğraflar</li>
                </ul>
              </Col>
             
            </Row>
          </Container>
        </footer>

      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCurrentUser: bindActionCreators(authAsyncActions.getCurrentUserApi, dispatch),
      getUserIsOwner: bindActionCreators(getUserIsOwnerSuccess, dispatch)

    }
  }
}
function mapStateToProps(state) {
  return {
    currentUser: state.currentUserReducer,
    isLoading: state.isLoadingReducer
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);


