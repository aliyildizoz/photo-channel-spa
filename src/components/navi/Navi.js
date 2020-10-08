import React, { Component, useEffect } from 'react'
import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap"
import { Link, useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom'
import { connect, useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authAsyncActions from '../../redux/actions/auth/authAsyncActions'
import Loading from '../common/Loading'

class Navi extends Component {

    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Link to="/"><Navbar.Brand>PhotoChannel</Navbar.Brand></Link>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Form inline>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                    <Button variant="outline-light">Search</Button>
                                </Form>
                            </Nav>
                            <NaviAuthButtons logoutEvent={this.props.actions.logoutApi} />
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        isLogged: state.isLoggedReducer
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            logoutApi: bindActionCreators(authAsyncActions.logoutApi, dispatch)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navi);

function NaviAuthButtons({ logoutEvent }) {
    const isLogged = useSelector(state => state.isLoggedReducer);
    const currentUser = useSelector(state => state.currentUserReducer);

    return isLogged ? <Nav className="mr-auto">
        <Link to="/login" onClick={logoutEvent} className="nav-link">Çıkış</Link>
        <Link to={"/profile/" + currentUser.id} className="nav-link">Profil</Link>
    </Nav> : <Nav className="mr-auto">
            <Link to="/login" className="nav-link ">Giriş</Link>
            <Link to="/register" className="nav-link ">Üye ol</Link>
        </Nav>;
}