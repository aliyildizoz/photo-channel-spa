import React, { Component } from 'react'
import { Modal, FormGroup, Form } from 'react-bootstrap'
import { FilePond, registerPlugin, File } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as channelActions from '../../redux/actions/channelActions'
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginImageExifOrientation);

class ChannelCreateModal extends Component {

    state = {
        model: {
            name: "",
            file: {}
        },
        validate: false,
        isBlock: false
    }
    onChangeHandler = (e) => {
        this.setState({ model: { ...this.state.model, name: e.target.value }, validate: true })
    }
    onSubmitHandler = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            if (Object.keys(this.state.model.file).length === 0) this.setIsBlock(true)
            else this.setIsBlock(false)
        } else {
            console.log("valid1")
        }
        this.setValidated(true);
    }
    setValidated = (val) => this.setState({ validate: val })
    setIsBlock = (val) => this.setState({ isBlock: val })

    render() {
        const { validate } = this.state;
        return (
            <div>
                <Modal
                    size="lg"
                    show={this.props.isShow}
                    onHide={() => this.props.onHide(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Yeni Kanal
                         </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={validate} onSubmit={this.onSubmitHandler}>
                            <FormGroup>
                                <Form.Control type="text" name="name" onChange={this.onChangeHandler} required placeholder="Kanal adı" />
                                <Form.Control.Feedback type="invalid">
                                    Kanal adı boş olamaz
                                </Form.Control.Feedback>
                            </FormGroup>
                            <div className="custom-file">
                                <FilePond
                                    allowMultiple={false}
                                    onupdatefiles={imageFile => {
                                        var file = imageFile.map(f => f.file)[0] ? imageFile.map(f => f.file)[0] : {}
                                        this.setState({ model: { ...this.state.model, file: file }, validate: true, isBlock: false })
                                    }}
                                    labelIdle='Kanal fotoğrafını sürükle bırak veya <strong class="filepond--label-action">seç</strong>'
                                    acceptedFileTypes={['image/*']}
                                    required
                                />

                                <Form.Control.Feedback type="invalid" style={{ display: this.state.isBlock ? "block" : "none" }}>
                                    Kanal fotoğrafı boş olamaz
                                </Form.Control.Feedback>

                            </div>
                            <Button type="submit" block>Oluştur</Button>
                        </Form>

                    </Modal.Body>
                </Modal>
            </div >
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            channelCreateApi: bindActionCreators(channelActions.channelCreateApi, dispatch)
        }
    }
}

export default connect(null, mapDispatchToProps)(ChannelCreateModal);