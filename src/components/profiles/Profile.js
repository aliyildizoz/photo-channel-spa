import React, { Component } from 'react'
import { Container, Row, Col, Card, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userAsyncActions from '../../redux/actions/user/userAsyncActions'
import { getIsOwnerSuccess } from '../../redux/actions/user/userActionsCreators'
import { Flow, Subscriptions } from './profileHooks'
import Loading from '../common/Loading'

class Profile extends Component {

    state = {
        renderState: "photos",
        isLoading: true
    }
    componentDidMount() {
        this.props.actions.getUserDetail(this.props.match.params.id, () => this.setState({ ...this.state, isLoading: false }))
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.props.actions.getUserDetail(this.props.match.params.id, () => this.setState({ ...this.state, isLoading: false }))
        }
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
                                        {this.state.isLoading ? <Loading /> : <Row>
                                            <Col md={{ span: 2 }} className="mt-3 mb-4">
                                                <Card.Title>{this.props.userDetail.firstName + " " + this.props.userDetail.lastName}</Card.Title>
                                                <h6>{this.props.userDetail.userName}</h6>
                                                <Card.Text>
                                                    <Link to={"/profile/" + this.props.match.params.id + "/channels"} className="btn btn-sm btn-danger block">
                                                        Kanallar
                                                    </Link>
                                                </Card.Text>
                                            </Col>
                                            <Col>
                                                {this.props.isOwner ?
                                                    <Link id="settingLink" className="float-right mt-3" to={this.props.match.params.id + "/settings"}>
                                                        <i className="fas fa-user-edit fa-2x"></i>
                                                    </Link>
                                                    : null}
                                            </Col>

                                        </Row>}
                                    </div>
                                </Col>
                            </Card>
                        </Col>
                        <Col md="4" >
                            <Row>
                                <Col md="12"  >
                                    <Subscriptions subsCount={this.props.userDetail.subscriptionCount} userId={this.props.match.params.id} />
                                </Col>
                            </Row>
                        </Col>
                        <Col md="8" >

                            <Flow renderState={this.state.renderState} userId={this.props.match.params.id} />

                        </Col>

                    </Row>

                </Container>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        userDetail: state.userReducer.userDetail,
        isOwner: state.userReducer.isOwner,
        currentUser: state.currentUserReducer.detail,
        isLoading: state.isLoadingReducer,
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