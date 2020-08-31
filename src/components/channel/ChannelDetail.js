import React, { Component } from 'react'
import { Container, Row, Col, Button, Badge, DropdownButton, Dropdown, ButtonToolbar, ToggleButtonGroup, ToggleButton, FormGroup, Form, ListGroup } from 'react-bootstrap'
import Navi from '../navi/Navi'
import { Link } from 'react-router-dom'
import { Image, Transformation } from 'cloudinary-react';
import "../../modules/channelDetail.css"
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as photoAsyncActions from "../../redux/actions/photo/photoAsyncActions"
import * as channelAsyncActions from "../../redux/actions/channel/channelAsyncActions"
import { SubsButton, ChannelPhotos, Flow, ChannelCategories } from './channelHooks';
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginImageExifOrientation);

class ChannelDetail extends Component {
    state = {
        firsRenderFlow: "photos",
        model: {
            file: {},
            channelId: 1
        }
    }
    componentDidMount() {
        this.props.actions.getChannelDetail(this.props.match.params.id, this.props.history)

    }
    onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(this.state.model.file)
        if (Object.keys(this.state.model.file).length === 0) this.setIsBlock(true)
        else {
            //fotoğraf yükleme
        }
    }
    render() {

        return (
            <div>
                <Container>
                    <Row >
                        <Col md="12">
                            <div className="containerImg" >
                                <Image cloudName="dwebpzxqn" publicId={this.props.channelDetail.publicId} className="img-fluid"  >
                                    <Transformation width="1102" height="250" crop="pad" background="auto:predominant" />
                                </Image>
                                <SubsButton subsCount={this.props.channelDetail.subscribersCount} channelId={this.props.match.params.id} />
                                <div className="text-ChannelName">
                                    <h4>{this.props.channelDetail.name}</h4>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col md="3">
                            <ChannelCategories channelId={this.props.match.params.id}></ChannelCategories>
                            {
                                this.props.isSubs ? <Form className="mt-3" noValidate onSubmit={this.onSubmitHandler}>

                                    <FormGroup>
                                        <FilePond
                                            allowMultiple={false}
                                            onupdatefiles={imageFile => {
                                                var file = imageFile.map(f => f.file)[0] ? imageFile.map(f => f.file)[0] : {}
                                                this.setState({ model: { ...this.state.model, file: file }, isBlock: false })
                                            }}
                                            labelIdle='Fotoğrafını sürükle bırak veya <strong class="filepond--label-action">seç</strong>'
                                            acceptedFileTypes={['image/*']}
                                            required
                                        />

                                    </FormGroup>
                                    <Button type="submit" block variant="outline-secondary">Yükle</Button>
                                </Form> : null
                            }

                        </Col>
                        <Col md="9">
                            <Flow renderState={this.state.firsRenderFlow} channelId={this.props.match.params.id} />
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
            // photoCreateApi: bindActionCreators(photoAsyncActions.photoCreateApi, dispatch),
            getChannelDetail: bindActionCreators(channelAsyncActions.getChannelDetailApi, dispatch)
        }
    }
}
function mapStateToProps(state) {
    return {
        channelDetail: state.channelReducer.channelDetail,
        isSubs: state.isSubsReducer

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelDetail);