import React, { Component } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userAsyncActions from '../../redux/actions/user/userAsyncActions'
import { Flow, Subscriptions } from './profileHooks'
import Loading from '../common/Loading'
import withRouter from '../../redux/helpers/withRouter';
import { getUserIsOwnerSuccess } from '../../redux/actions/user/userActionsCreators'

class Profile extends Component {

    state = {
        isLoading: true,
        userId:0
    }
    componentDidMount() {
        var userId = this.props.router.params.id;
        if (this.props.router.location.pathname.includes('me')) {
            this.props.actions.getUserIsOwner(true);
            userId = this.props.currentUser.id;
        }else{
            this.props.getUserIsOwner(this.props.currentUser.id == this.props.router.params.id);
        }

        this.setState({ ...this.state, userId: userId });
        this.props.actions.getUserDetail(userId, () => this.setState({ ...this.state, isLoading: false }))
    }
    componentDidUpdate(prevProps) {
        let userId = this.props.router.location.pathname.includes('me') ? this.props.currentUser.id : this.props.router.params.id;
        let userIdPrev = this.props.router.location.pathname.includes('me') ? prevProps.currentUser.id : prevProps.router.params.id;
        if (userId !== userIdPrev) {
            this.setState({ ...this.state, userId: userId });
            this.props.actions.getUserDetail(userId, () => this.setState({ ...this.state, isLoading: false }))
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
                                                    <Link to={"/profile/" + this.state.userId + "/channels"} className="btn btn-sm btn-danger block">
                                                        Kanallar
                                                    </Link>
                                                </Card.Text>
                                            </Col>
                                            <Col>
                                                {this.props.isOwner ?
                                                    <Link id="settingLink" className="float-right mt-3" to="../settings" relative='path'>
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
                                    <Subscriptions subsCount={this.props.userDetail.subscriptionCount} />
                                </Col>
                            </Row>
                        </Col>
                        <Col md="8" >

                            <Flow renderState={this.props.flowState} />

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
            getUserDetail: bindActionCreators(userAsyncActions.getUserApi, dispatch),
            getUserIsOwner: bindActionCreators(getUserIsOwnerSuccess, dispatch)
        }
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));