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
import * as userActions from '../../redux/actions/userActions'

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
            return <SharedPhotos />
        } else {
            return <LikedPhotos />
        }
    }
    componentDidMount = () => {
        this.props.actions.getUserDetail(this.props.match.params.id, this.props.history)
    }
    setChannelCreateModalShow = (val) => {
        this.setState({ isChannelCreateModalShow: val })
    }
    render() {


        const Settings = () => {
            if (this.props.loggedUser.id && this.props.currentUserDetail.id) {
                if (this.props.loggedUser.id === this.props.currentUserDetail.id) {
                    return <Col md={{ span: 2, offset: 8 }} className="mt-3">
                        <Link to={this.props.currentUserDetail.id + "/settings"} className="text-decoration-none"><Button variant="info" block className="btn-sm mb-2">Ayarlar</Button></Link>
                        <Button onClick={() => this.setChannelCreateModalShow(true)} block className="btn-sm" variant="success">Yeni kanal</Button>
                        <ChannelCreateModal isShow={this.state.isChannelCreateModalShow} onHide={this.setChannelCreateModalShow} />
                    </Col>
                }
            }
            return null;
        }

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
                                                    <Button variant="danger" block className="btn-sm ">
                                                        <Badge pill variant="secondary">{this.props.currentUserDetail.subscriptionCount}</Badge>{" "} Abonelikler
                                                        </Button>
                                                </Card.Text>
                                            </Col>
                                            <Settings />
                                        </Row>
                                    </div>
                                </Col>
                            </Card>
                        </Col>
                        <Col md="3" >
                            <Row>
                                <Col md="12"  >
                                    <ListGroup >
                                        <ListGroup.Item style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, borderTop: 0 }}><Media>
                                            <img
                                                width={25}
                                                height={25}
                                                className="mr-3"
                                                src="https://images.all-free-download.com/images/graphicthumb/colombia_91424.jpg"
                                                alt="Kanal Adı"
                                            />
                                            <Link to="/">
                                                Kanal Adı
                                    </Link>
                                        </Media></ListGroup.Item>
                                        <ListGroup.Item><Media>
                                            <img
                                                width={25}
                                                height={25}
                                                className="mr-3"
                                                src="https://images.all-free-download.com/images/graphicthumb/colombia_91424.jpg"
                                                alt="Kanal Adı"
                                            />
                                            <Link to="/">
                                                Kanal Adı
                                    </Link>
                                        </Media></ListGroup.Item>
                                        <ListGroup.Item><Media>
                                            <img
                                                width={25}
                                                height={25}
                                                className="mr-3"
                                                src="https://images.all-free-download.com/images/graphicthumb/colombia_91424.jpg"
                                                alt="Kanal Adı"
                                            />
                                            <Link to="/">
                                                Kanal Adı
                                    </Link>
                                        </Media></ListGroup.Item>
                                        <ListGroup.Item><Media>
                                            <img
                                                width={25}
                                                height={25}
                                                className="mr-3"
                                                src="https://images.all-free-download.com/images/graphicthumb/colombia_91424.jpg"
                                                alt="Kanal Adı"
                                            />
                                            <Link to="/">
                                                Kanal Adı
                                    </Link>
                                        </Media></ListGroup.Item>
                                        <ListGroup.Item><Media>
                                            <img
                                                width={25}
                                                height={25}
                                                className="mr-3"
                                                src="https://images.all-free-download.com/images/graphicthumb/colombia_91424.jpg"
                                                alt="Kanal Adı"
                                            />
                                            <Link to="/">
                                                Kanal Adı
                                    </Link>
                                        </Media></ListGroup.Item>
                                        <ListGroup.Item><Link to="/">Daha fazla...</Link></ListGroup.Item>
                                    </ListGroup>

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
        currentUserDetail: state.userReducer.userDetail,
        loggedUser: state.authReducer.loggedUser
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getUserDetail: bindActionCreators(userActions.getUserApi, dispatch)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);