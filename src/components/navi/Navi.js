import React, { Component } from 'react'
import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authAsyncActions from '../../redux/actions/auth/authAsyncActions'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

class Navi extends Component {

    render() {
        return (
            <div style={{ marginBottom: 55 }}>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="fixed-top" >
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
    const currentUser = useSelector(state => state.currentUserReducer.detail);
    const history = useHistory()

    return isLogged ? <Nav >
        <Link to="/" onClick={() => logoutEvent(history)} className="nav-link"><i className="fas fa-sign-out-alt"></i> Çıkış</Link>
        <Link to={"/profile/" + currentUser.id} className="nav-link"><i className="fas fa-user"></i> Profil</Link>
    </Nav> : <Nav >
            <Link to="/login" className="nav-link "><i className="fas fa-sign-in-alt"></i> Giriş</Link>
            <Link to="/register" className="nav-link "><i className="fas fa-user-plus"></i> Üye ol</Link>
        </Nav>;
}