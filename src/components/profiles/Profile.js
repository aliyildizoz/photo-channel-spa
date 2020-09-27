import React, { Component } from 'react'
import { Container, Row, Col, Card, ListGroup, Modal, Badge } from 'react-bootstrap'
import Navi from '../navi/Navi'
import { Button } from 'react-bootstrap'
import { Media } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ButtonToolbar } from 'react-bootstrap'
import { ToggleButton } from 'react-bootstrap'
import { ToggleButtonGroup } from 'react-bootstrap'
import SharedPhotos from './SharedPhotos'
import LikedPhotos from './LikedPhotos'
import ChannelCreateModal from '../channel/ChannelCreateModal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userAsyncActions from '../../redux/actions/user/userAsyncActions'
import UserChannels from './UserChannels'
import { Flow } from './profileHooks'

class Profile extends Component {

    state = {
        renderState:"likes",
        isChannelCreateModalShow: false
    }

    componentDidMount = () => {
        this.props.actions.getUserDetail(this.props.match.params.id, this.props.history)
    }
    setChannelCreateModalShow = (val) => {
        this.setState({ isChannelCreateModalShow: val })
    }
    render() {


        return (
            <div>

                <Container>
                    <Row>
                        <Col md="12">
                            <Card className="card-inverse rounded-0" style={{ borderWidth: 1, marginTop: 20 }}>
                                <Col>
                                    <div className="card-block">
                                        <Row>
                                            <Col md={{ span: 2 }} className="mt-3 mb-4">
                                                <Card.Title>{this.props.currentUserDetail.firstName + " " + this.props.currentUserDetail.lastName}</Card.Title>
                                                <h6>{this.props.currentUserDetail.userName}</h6>
                                                <Card.Text>
                                                    <Link to={"/profile/" + this.props.currentUserDetail.id + "/subscriptions"} className="btn btn-sm btn-danger block">
                                                        <Badge pill variant="secondary">{this.props.currentUserDetail.subscriptionCount}</Badge>{" "} Abonelikler
                                                    </Link>
                                                </Card.Text>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Card>
                        </Col>
                        <Col md="3" >
                            <Row>
                                <Col md="12"  >
                                    <UserChannels userId={this.props.currentUserDetail.id}></UserChannels>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="9" >

                            <Flow renderState={this.state.renderState}></Flow>

                        </Col>

                    </Row>
                </Container>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        currentUserDetail: state.userReducer.userDetail
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getUserDetail: bindActionCreators(userAsyncActions.getUserApi, dispatch)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);