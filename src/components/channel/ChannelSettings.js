import React, { Component } from 'react'
import { Container, Row, Col, Button, Accordion, Card, Alert } from 'react-bootstrap'
import { getSubscribersApi, getChannelDetailApi, getChannelCategoriesApi, getChannelIsOwnerApi } from "../../redux/actions/channel/channelAsyncActions"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as categoryAsyncActions from '../../redux/actions/category/categoryAsyncActions'
import { ChannelUpdate, CategoryUpdate, Subscribers, ChannelDelete } from './channelSettingsHooks'
import { Image, Transformation } from 'cloudinary-react';
import moment from "moment"
import Loading from '../common/Loading';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
class ChannelSettings extends Component {
    componentDidMount() {

        var channelId = this.props.match.params.id;
        var history = this.props.history;

        this.props.actions.getChannelIsOwner(channelId, history)

        if (!this.props.channelIsOwner) {
            this.props.actions.getChannelDetail(channelId, history)
            this.props.actions.getSubscribers(channelId, history)
            this.props.actions.getChannelCategories(channelId, history)
            if (Object.keys(this.props.categories).length === 0) {
                this.props.actions.getCategories()
            }
        }
    }


    render() {

        return (
            <div>
                {this.props.isLoading ? <Loading /> : this.props.channelIsOwner ? <Container>
                    <Row>
                        <Col md="12">
                            <div className="containerImg" >
                                <Image cloudName="dwebpzxqn" publicId={this.props.channelDetail.publicId} className="img-fluid"  >
                                    <Transformation width="1102" height="250" crop="pad" background="auto:predominant" />
                                </Image>
                            </div>

                            <h6 className="font-weight-light mr-3 mb-3 bottom-right "> {moment(this.props.channelDetail.createdDate).format("DD.MM.YYYY")}</h6>

                            <div className="text-ChannelName">
                                <h4>{this.props.channelDetail.name}</h4>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col md="6">
                            <Row >
                                <ChannelUpdate channelId={this.props.match.params.id} />
                            </Row>
                            <Row>
                                <CategoryUpdate channelId={this.props.match.params.id} />
                            </Row>
                            <Row>
                                <ChannelDelete channelId={this.props.match.params.id} />
                            </Row>
                        </Col>
                        <Col>
                            <Subscribers channelId={this.props.match.params.id} />
                        </Col>
                    </Row>
                </Container> : <Redirect to={"/channel/" + this.props.match.params.id} />}
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
        subscribers: state.channelReducer.subscribers,
        categories: state.categoryListReducer,
        channelIsOwner: state.channelIsOwnerReducer,
        isLoading: state.isLoadingReducer,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelSettings);