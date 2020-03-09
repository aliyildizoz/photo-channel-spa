import React, { Component } from 'react'
import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import * as authActions from '../../redux/actions/authActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Navi extends Component {
    logOutOnclick = () => {
        this.props.actions.logOut(this.props.history);
    }
    ioRedirect = () => {
        if (Object.keys(this.props.loggedUser).length === 0) {
            return (
                <Nav className="mr-auto">
                    <Link to="/login" className="nav-link ">Giriş</Link>
                    <Link to="/register" className="nav-link ">Üye ol</Link>
                </Nav>
            )
        } else {
            return (
                <Nav className="mr-auto">>
                    <Link to="/login" onClick={this.logOutOnclick} className="nav-link">Çıkış</Link>
                    <Link to={"/profile/" + this.props.loggedUser.id} className="nav-link">Profil</Link>
                </Nav>
            )
        }
    }
   
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
                            {
                                this.ioRedirect()
                            }
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            logOut: bindActionCreators(authActions.logoutApi, dispatch),
            getLoggedUser: bindActionCreators(authActions.getLoggedUserApi, dispatch)
        }
    }
}
function mapStateToProps(state) {
    return {
        loggedUser: state.authReducer.loggedUser
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navi);