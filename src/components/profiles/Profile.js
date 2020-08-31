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

class Profile extends Component {

    state = {
        index: 1,
        isChannelCreateModalShow: false
    }
    onChangeHandler = (e) => {
        this.setState({ index: e.target.value })
    }
    renderFlow = () => {
        if (this.state.index == 1) {
            return <SharedPhotos userId={this.props.currentUserDetail.id} />
        } else {
            return <LikedPhotos  userId={this.props.currentUserDetail.id} />
        }
    }
    componentDidMount = () => {
        this.props.actions.getUserDetail(this.props.match.params.id, this.props.history)
    }
    setChannelCreateModalShow = (val) => {
        this.setState({ isChannelCreateModalShow: val })
    }
    render() {


        // const Settings = () => {
        //     if (this.props.loggedUser.id && this.props.currentUserDetail.id) {
        //         if (this.props.loggedUser.id === this.props.currentUserDetail.id) {
        //             return <Col md={{ span: 2, offset: 8 }} className="mt-3">
        //                 <Link to={this.props.currentUserDetail.id + "/settings"} className="text-decoration-none"><Button variant="info" block className="btn-sm mb-2">Ayarlar</Button></Link>
        //                 <Button onClick={() => this.setChannelCreateModalShow(true)} block className="btn-sm" variant="success">Yeni kanal</Button>
        //                 <ChannelCreateModal isShow={this.state.isChannelCreateModalShow} onHide={this.setChannelCreateModalShow} />
        //             </Col>
        //         }
        //     }
        //     return null;
        // }

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
                                            {/* <Settings /> */}
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
                            <Row>
                                <Col md="12"  >
                                    <ButtonToolbar className="d-flex flex-column" style={{ paddingRight: 30 }}>
                                        <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                                            <ToggleButton onChange={this.onChangeHandler} name="sharedPhotos" className="rounded-0" value={1} >Fotoğraflar</ToggleButton>
                                            <ToggleButton onChange={this.onChangeHandler} name="likedPhotos" className="rounded-0" value={2} >Beğeniler</ToggleButton>
                                        </ToggleButtonGroup>
                                    </ButtonToolbar>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{ span: 12, offset: 1 }}  >
                                    {
                                        this.renderFlow()
                                    }
                                </Col>
                            </Row>
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