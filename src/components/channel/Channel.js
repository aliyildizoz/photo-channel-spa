import React, { Component } from 'react'
import { Container, Row, Col, Button, FormGroup, Form } from 'react-bootstrap'
import { Image, Transformation } from 'cloudinary-react';
import "../../../public/css/channelDetail.css"
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSubscribersApi, getChannelDetailApi, getChannelCategoriesApi, getChannelIsOwnerApi } from "../../redux/actions/channel/channelAsyncActions"
import { photoCreateApi, channelPhotosApi } from "../../redux/actions/photo/photoAsyncActions"
import { SubsButton, Flow, ChannelCategories } from './channelHooks';
import SimpleReactValidator from 'simple-react-validator';
import { getIsSubsApi } from '../../redux/actions/subscrib/subsAsyncAction';

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginImageExifOrientation);

class ChannelDetail extends Component {
    state = {
        firsRenderFlow: "photos",
        model: {
            files: []
        },
        validMessage: "Lütfen bir fotoğraf seçiniz."
    }
    validator = new SimpleReactValidator({ locale: 'tr' });
    componentDidMount() {

        var channelId = this.props.match.params.id;
        this.props.actions.getChannelDetail(channelId, this.props.history)
        this.props.actions.getChannelPhotos(channelId, this.props.history)
        this.props.actions.getSubscribers(channelId, this.props.history)
        this.props.actions.getCategories(channelId, this.props.history)
        this.props.actions.getIsSub(channelId, this.props.history)
    }
    onSubmitHandler = (e) => {
        e.preventDefault();
        
        if (this.state.model.files.length === 0) {
            this.validator.showMessages();
            this.forceUpdate();
        }
        else {
            this.props.actions.addPhoto({ file: this.state.model.file[0], channelId: this.props.match.params.id }, this.props.history)
            this.setState({ ...this.state, model: { ...this.state.model, files: [] } })
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
                                this.props.isSubs ? <Form className="mt-3" onSubmit={this.onSubmitHandler}>

                                    <FormGroup>
                                        <FilePond
                                            allowMultiple={false}
                                            onupdatefiles={imageFile => {
                                                var file = imageFile.map(f => f.file)
                                                this.setState({ model: { ...this.state.model, file: file } })
                                            }}
                                            labelIdle='Fotoğrafını sürükle bırak veya <strong class="filepond--label-action">seç</strong>'
                                            acceptedFileTypes={['image/*']}
                                            files={this.state.model.file}


                                        />

                                        {this.validator.messageWhenPresent(this.state.validMessage, { className: 'text-danger' })}
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
            addPhoto: bindActionCreators(photoCreateApi, dispatch),
            getChannelDetail: bindActionCreators(getChannelDetailApi, dispatch),
            getChannelPhotos: bindActionCreators(channelPhotosApi, dispatch),
            getSubscribers: bindActionCreators(getSubscribersApi, dispatch),
            getCategories: bindActionCreators(getChannelCategoriesApi, dispatch),
            getIsSub: bindActionCreators(getIsSubsApi, dispatch)
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