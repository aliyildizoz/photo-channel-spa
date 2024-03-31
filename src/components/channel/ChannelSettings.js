import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { getSubscribersApi, getChannelDetailApi, getChannelCategoriesApi, getChannelIsOwnerApi } from "../../redux/actions/channel/channelAsyncActions"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as categoryAsyncActions from '../../redux/actions/category/categoryAsyncActions'
import { ChannelUpdate, CategoryUpdate, Subscribers, ChannelDelete } from './channelSettingsHooks'
import { Image, Transformation } from 'cloudinary-react';
import Loading from '../common/Loading';
import { Navigate } from 'react-router-dom';
import withRouter from '../../redux/helpers/withRouter';


class ChannelSettings extends Component {
    componentDidMount() {
        var channelId = this.props.router.params.id;
        this.props.actions.getChannelIsOwner(channelId)
        this.props.actions.getChannelDetail(channelId)
        this.props.actions.getSubscribers(channelId)
        this.props.actions.getChannelCategories(channelId)
        if (Object.keys(this.props.categories).length === 0) {
            this.props.actions.getCategories()
        }
    }


    render() {
        return (
            <div>
                {
                    this.props.channelIsLoading ? <Loading /> : this.props.channelIsOwner ? <Container>
                        <Row>
                            <Col md="12">
                                <div className="containerImg" >
                                    <Image cloudName="dwebpzxqn" publicId={this.props.channelDetail.publicId} className="img-fluid"  >
                                        <Transformation width="1102" height="250" crop="pad" background="auto:predominant" />
                                    </Image>
                                </div>

                                <h6 className="font-weight-light mr-3 mb-3 bottom-right "> </h6>

                                <div className="text-ChannelName">
                                    <h4>{this.props.channelDetail.name}</h4>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md="6">
                                <Row >
                                    <ChannelUpdate channelId={this.props.router.params.id} />
                                </Row>
                                <Row>
                                    <CategoryUpdate channelId={this.props.router.params.id} />
                                </Row>
                                <Row>
                                    <ChannelDelete channelId={this.props.router.params.id} />
                                </Row>
                            </Col>
                            <Col>
                                <Subscribers channelId={this.props.router.params.id} />
                            </Col>
                        </Row>
                    </Container> : <Navigate to={"/channel/" + this.props.router.params.id} />
                }
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getChannelDetail: bindActionCreators(getChannelDetailApi, dispatch),
            getSubscribers: bindActionCreators(getSubscribersApi, dispatch),
            getChannelCategories: bindActionCreators(getChannelCategoriesApi, dispatch),
            getChannelIsOwner: bindActionCreators(getChannelIsOwnerApi, dispatch),
            getCategories: bindActionCreators(categoryAsyncActions.getCategories, dispatch)

        }
    }
}
function mapStateToProps(state) {
    return {
        channelDetail: state.channelReducer.channelDetail,
        channelIsLoading: state.channelReducer.channelIsLoading,
        subscribers: state.channelReducer.subscribers,
        categories: state.categoryListReducer,
        channelIsOwner: state.channelIsOwnerReducer,
        isLoading: state.isLoadingReducer,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelSettings));