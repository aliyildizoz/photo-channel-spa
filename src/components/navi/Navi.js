import React, { Component, useEffect } from 'react'
import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authAsyncActions from '../../redux/actions/auth/authAsyncActions'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { searchByTextApi } from '../../redux/actions/search/searchAsyncActions'
import SearchInput from '../search/SearchInput'
import { setSelectedCategoriesSuccess } from '../../redux/actions/category/categoryActionCreators'

class Navi extends Component {

    state = {
        searchText: ""
    }
    onChangeHandler = (event) => {
        this.setState({ ...this.state, searchText: event.target.value })
    }
    onSubmitHandler = (event) => {
        event.preventDefault();

        if (this.state.searchText !== "") {
            this.props.actions.searchByTextApi(this.state.searchText,)
        }
    }
    render() {
        return (
            <div style={{ marginBottom: 55 }}>
                <Navbar collapseOnSelect expand="lg" bg="info" variant="dark" className="fixed-top" >
                    <Container>
                        <Link to="/" onClick={() => this.props.actions.setSelectedCategories([])}><Navbar.Brand>PhotoChannel</Navbar.Brand></Link>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto ml-auto">
                                <SearchInput />
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
            logoutApi: bindActionCreators(authAsyncActions.logoutApi, dispatch),
            searchByTextApi: bindActionCreators(searchByTextApi, dispatch),
            setSelectedCategories: bindActionCreators(setSelectedCategoriesSuccess, dispatch)
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
        <Link to={"/profile/me"} className="nav-link"><i className="fas fa-user"></i> Profil</Link>
    </Nav> : <Nav >
            <Link to="/login" className="nav-link "><i className="fas fa-sign-in-alt"></i> Giriş</Link>
            <Link to="/register" className="nav-link "><i className="fas fa-user-plus"></i> Üye ol</Link>
        </Nav>;
}

