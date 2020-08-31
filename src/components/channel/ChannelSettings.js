import React, { Component } from 'react'
import { Container, Row, Col, Form, FormGroup, Button, ListGroup, Badge } from 'react-bootstrap'
import { FilePond, registerPlugin } from 'react-filepond'
import { Link } from 'react-router-dom'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import { Typeahead } from 'react-bootstrap-typeahead';
import * as channelAsyncActions from "../../redux/actions/channel/channelAsyncActions"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginImageExifOrientation);
class ChannelSettings extends Component {
    state = {
        channelModel: {
            file: {},
            name: ""
        },
        categoryModel: {
            categoryIds: []
        },
        channelValidate: false,
        categoryValidate: false
    }

    componentDidMount() {
        if (Object.keys(this.props.channelDetail).length === 0) {
            this.props.actions.getChannelDetail(this.props.match.params.id, this.props.history);
        }
        if (Object.keys(this.props.channelSubscribers).length === 0) {
            // this.props.actions.getSubscribers(this.props.match.params.id, this.props.history);
        }
    }
    onSubmitChannelHandler = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            this.props.actions.channelUpdate(this.state.channelModel, this.props.match.params.id, this.props.history)
        }
        this.setChannelValidated(true);
    }
    onSubmitCategoryHandler = (event) => {
        event.preventDefault();
        if (this.state.categoryModel.length === 0) {
            this.setCategoryValidated(true);
        } else {

            this.props.actions.addCategories(this.state.categoryModel.categoryIds, Number.parseInt(this.props.match.params.id), this.props.history)

            //console.log(this.state.categoryModel.categoryIds)
        }

    }
    onChangeCategoryHandler = (category) => {
        this.setState({ categoryModel: { categoryIds: category.map(c => { return c.id }) }, categoryValidate: category.length === 0 })
    }
    onChangeChannelHandler = (e) => {
        this.setState({ channelModel: { ...this.state.channelModel, name: e.target.value }, channelValidate: true })
    }
    setChannelValidated = (val) => this.setState({ channelValidate: val })
    setCategoryValidated = (val) => this.setState({ categoryValidate: val })
    setIsBlock = (val) => this.setState({ isBlock: val })
    apiValidate = () => {
        if (this.props.updateRes.data) {
            return <div className="text-danger">{this.props.updateRes.data}</div>
        }
        return null;
    }
    addChannelAdmin = (subs) => {
        this.props.actions.addAdmin({ admin: subs, apiModel: { userId: subs.id, channelId: Number.parseInt(this.props.match.params.id) } }, this.props.history);
    }
    removeChannelAdmin = (admin) => {
        this.props.actions.removeAdmin({ admin: admin, apiModel: { userId: admin.id, channelId: Number.parseInt(this.props.match.params.id) } }, this.props.history);
    }
    render() {
        const { channelValidate, categoryValidate } = this.state;
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
                        <Col >
                            <h4>Kanalı güncelle</h4>
                            <hr />


                            <Form noValidate validated={channelValidate} onSubmit={this.onSubmitChannelHandler} className="mb-3">

                                <FormGroup>
                                    <Form.Control type="text" name="name" onChange={this.onChangeChannelHandler} required placeholder="Kanal adı" defaultValue={this.props.channelDetail.name} />
                                    {
                                        this.apiValidate()
                                    }
                                </FormGroup>
                                <div className="custom-file">
                                    <FilePond
                                        allowMultiple={false}
                                        onupdatefiles={imageFile => {
                                            var file = imageFile.map(f => f.file)[0] ? imageFile.map(f => f.file)[0] : {}
                                            this.setState({ channelModel: { ...this.state.channelModel, file: file }, channelValidate: true, isBlock: false })
                                        }}
                                        labelIdle='Kanal fotoğrafını değiştirmek için fotoğrafı sürükle bırak veya <strong class="filepond--label-action">seç</strong>'
                                        acceptedFileTypes={['image/*']}


                                    />
                                </div>
                                <Button type="submit" className="mt-2" block>Kaydet</Button>
                            </Form>
                            <h5>Kategori seç</h5>
                            <hr />
                            <Form onSubmit={this.onSubmitCategoryHandler}>

                                <FormGroup>
                                    <Typeahead
                                        clearButton
                                        defaultSelected={this.props.currentCategories ? this.props.currentCategories : null}
                                        id="selections-example"
                                        labelKey="name"
                                        multiple
                                        options={this.props.categories}
                                        placeholder="Kategori seç"
                                        className="mb-3"
                                        onChange={this.onChangeCategoryHandler}
                                        required
                                        isInvalid={categoryValidate}

                                    />
                                </FormGroup>
                                <Button type="submit" block>Kaydet</Button>
                            </Form>

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
            getChannelDetail: bindActionCreators(channelAsyncActions.getChannelDetailApi, dispatch),
            // addCategories: bindActionCreators(channelAsyncActions.addChannelCategoriesApi, dispatch),
            // getCategories: bindActionCreators(channelAsyncActions.getCategoriesApi, dispatch),
            // getSubscribers: bindActionCreators(channelAsyncActions.getChannelSubscribersApi, dispatch),
            // channelUpdate: bindActionCreators(channelAsyncActions.channelUpdateApi, dispatch)
        }
    }
}
function mapStateToProps(state) {
    return {
        channelDetail: state.channelReducer.channelDetail,
        // channelSubscribers: state.channelReducer.channelSubscribers,
        // categories: state.categoryListReducer,
        // currentCategories: state.channelReducer.categories,
        // updateRes: state.channelCRUDReducer.channelUpdateResult
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelSettings);