import React, { Component } from 'react'
import Navi from '../navi/Navi';
import { Container, Col, Row } from 'react-bootstrap';
import CategoryList from '../categories/CategoryList';
import PhotoCard from '../photoCard/PhotoCard'
import { bindActionCreators } from 'redux';
import * as authActions from '../../redux/actions/authActions'
import { connect } from 'react-redux'
class Home extends Component {
    componentDidMount = () => {
        if (Object.keys(this.props.loggedUser).length === 0) {
            this.props.actions.getLoggedUser()
        }
    }
    render() {
        return (
            <div>
                <Container className="mt-4">
                    <Row >
                        <Col md={2}>
                            <CategoryList />
                        </Col>
                        <Col md={6}>
                            <PhotoCard publicId="rgjfrvw9645y6tcux2i1" />
                        </Col>
                        <Col md={4}>

                        </Col>
                    </Row>
                </Container>
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);