import React, { Component } from 'react'
import Navi from '../navi/Navi';
import { Container, Col, Row } from 'react-bootstrap';
import CategoryList from '../categories/CategoryList';
import PhotoCard from '../photoCard/PhotoCard'
import { bindActionCreators } from 'redux';
import * as authAsyncActions from "../../redux/actions/auth/authAsyncActions"
import * as localStorageHelper from "../../redux/helpers/localStorageHelper"
import { connect } from 'react-redux'
import PhotoCardHook from '../photoCard/photoCardHook';
class Home extends Component {
    componentDidMount = () => {
        if (localStorageHelper.isExistsToken()) {
            if (Object.keys(this.props.currentUser).length === 0) {
                this.props.actions.getCurrentUser();
            }
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
                            <PhotoCardHook
                                key={1}
                                photo={{
                                    publicId: "ushqxs3qmzsj2w552oxv",
                                    likeCount: 25,
                                    commentCount: 22,
                                    userId: 1,
                                    userName: "aliylzz",
                                    shareDate: "20.04.2020 15:36",
                                    photoId: 1,
                                    channelId: 1,
                                    channelName: "Araba",
                                    channelPublicId: "ushqxs3qmzsj2w552oxv"
                                }}
                            />
                            <PhotoCardHook
                                key={2}
                                photo={{
                                    publicId: "qevpdls37lgqif5zzyr0",
                                    likeCount: 25,
                                    commentCount: 22,
                                    userId: 1,
                                    userName: "aliylzz",
                                    shareDate: "20.04.2020 15:36",
                                    photoId: 1,
                                    channelId: 2,
                                    channelName: "Araba",
                                    channelPublicId: "qevpdls37lgqif5zzyr0"
                                }}
                            />
                        </Col>
                        <Col md={4}>

                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        currentUser: state.currentUserReducer
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getCurrentUser: bindActionCreators(authAsyncActions.getCurrentUserApi, dispatch)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);