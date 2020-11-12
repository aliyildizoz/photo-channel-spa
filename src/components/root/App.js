import React, { Component } from 'react';
import Home from '../home/Home';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
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
import { Button, Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';

class App extends Component {

  componentDidMount() {
    this.props.actions.getCurrentUser()
  }
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
              this.props.actions.getUserIsOwner(this.props.currentUser.detail.id == props.match.params.id);
              return <Profile {...props} />
            }} />
            <Route exact path="/profile/:id/settings" render={(props) => {
              var urlId = props.match.params.id;
              return this.props.currentUser.isLoading ?
                <Loading /> : this.props.currentUser.detail.id == urlId ? < ProfileSettings {...props} /> : <Redirect to={"/profile/" + urlId} />;
            }
            } />
            <Route exact path="/profile/:id/channels" render={(props) => {
              if (this.props.currentUser.isLoading) {
                return <Loading />
              } else {
                var urlId = props.match.params.id;
                var isOwner = false;
                if (this.props.currentUser.detail.id == urlId) isOwner = true;

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

        
        {/* <footer className="bg-dark text-light" style={{ flexShrink: "none",marginTop:1080 }}>
          <Container>
            <Row className="pb-5 pt-5">
              <Col md={{ span: 4, offset: 2 }}>

                <h3>Site haritası</h3><hr className="bg-light" />
                {this.props.isLogged ? (
                  <ul>
                    <li><Link to="/" onClick={() => this.props.actions.logout()} className="text-decoration-none ml-0 pl-0">Çıkış</Link></li>
                    <li><Link to={"/profile/" + this.props.currentUser.detail.id} className="text-decoration-none">Profil</Link></li>
                    <li><Link to="/" className="text-decoration-none">Ana sayfa</Link></li>
                  </ul>
                ) : (
                    <ul>
                      <li><Link to="/login" className="text-decoration-none"> Giriş</Link></li>
                      <li><Link to="/register" className="text-decoration-none">Uye ol</Link></li>
                      <li><Link to="/" className="text-decoration-none">Ana sayfa</Link></li>
                    </ul>
                  )}



              </Col>
              <Col md={{ span: 4 }}>
                <ul >
                  <h3>En popüler</h3><hr className="bg-light" />
                  <li><i className="fas fa-star "></i> Kanallar</li>
                  <li><i className="fas fa-star "></i> Fotoğraflar</li>
                </ul>
              </Col>

            </Row>
            <Row><Col md={{ span: 4, offset: 2 }}>
              <h6 className="text-break text-justify text-muted font-weight-normal ">Copyright <i className="far fa-copyright mb-2"></i> Tüm hakları saklıdır.</h6>
            </Col></Row>
          </Container>
        </footer> */}

      </div>
    )
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
    isLogged: state.isLoadingReducer,

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);


