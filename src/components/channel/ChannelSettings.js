import React, { Component } from 'react'
import { Container, Row, Col, Form, FormGroup, Button, ListGroup, Badge } from 'react-bootstrap'
import { FilePond, registerPlugin } from 'react-filepond'
import { Link } from 'react-router-dom'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import { Typeahead } from 'react-bootstrap-typeahead';
import { getSubscribersApi, getChannelDetailApi, getChannelCategoriesApi } from "../../redux/actions/channel/channelAsyncActions"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as categoryAsyncActions from '../../redux/actions/category/categoryAsyncActions'
import { ChannelUpdate, CategoryUpdate, Subscribers } from './channelSettingsHooks'
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginImageExifOrientation);
class ChannelSettings extends Component {
    componentDidMount() {
        if (Object.keys(this.props.channelDetail).length === 0) {
            var channelId = this.props.match.params.id;
            this.props.actions.getChannelDetail(channelId, this.props.history)
            this.props.actions.getSubscribers(channelId, this.props.history)
            this.props.actions.getChannelCategories(channelId, this.props.history)
        }
        if (Object.keys(this.props.categories).length === 0) {
            this.props.actions.getCategories()
        }
    }


    render() {

        return (
            <div>
                <Container>
                    <Row className="mt-4">
                        <Col>
                            <h3 className="font-weight-normal d-inline-flex ">{this.props.channelDetail.name}</h3>
                            <h6 className="font-weight-light d-inline-flex  float-right mt-4">{this.props.channelDetail.createdDate ? this.props.channelDetail.createdDate.split("T")[0] : null}</h6>
                            <hr />
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
                        </Col>
                        <Col>
                            <Subscribers/>
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
            getChannelDetail: bindActionCreators(getChannelDetailApi, dispatch),
            getSubscribers: bindActionCreators(getSubscribersApi, dispatch),
            getChannelCategories: bindActionCreators(getChannelCategoriesApi, dispatch),
            getCategories: bindActionCreators(categoryAsyncActions.getCategories, dispatch),
        }
    }
}
function mapStateToProps(state) {
    return {
        channelDetail: state.channelReducer.channelDetail,
        subscribers: state.channelReducer.subscribers,
        categories: state.categoryListReducer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelSettings);