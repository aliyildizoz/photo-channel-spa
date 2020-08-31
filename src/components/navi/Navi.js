import React, { Component } from 'react'
import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authAsyncActions from '../../redux/actions/auth/authAsyncActions'
class Navi extends Component {
    logOutOnclick = () => {
        this.props.actions.logOut(this.props.history);
    }
    ioRedirect = () => {
        if (this.props.isLogged) {
            return (
                <Nav className="mr-auto">
                    <Link to="/login" onClick={this.logOutOnclick} className="nav-link">Çıkış</Link>
                    {/* <Link to={"/profile/" + this.props.currentUser.id} className="nav-link">Profil</Link> */}
                </Nav>
            )
        } else {
            return (
                <Nav className="mr-auto">
                    <Link to="/login" className="nav-link ">Giriş</Link>
                    <Link to="/register" className="nav-link ">Üye ol</Link>
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
            logOut: bindActionCreators(authAsyncActions.logoutApi, dispatch)
        }
    }
}
function mapStateToProps(state) {
    return {
        isLogged: state.isLoggedReducer
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navi);