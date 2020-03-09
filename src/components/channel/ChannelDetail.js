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
import * as photoActions from "../../redux/actions/photoActions"
import PhotoGalery from '../photos/PhotoGalery';
import ChannelPhotos from './ChannelPhotos';
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginImageExifOrientation);

class ChannelDetail extends Component {


    state = {
        index: 1,
        isSubs: false,
        isBlock: false,
        model: {
            file: {},
            channelId: 1
        }
    }
    setIsSubs = () => {
        this.setState({ isSubs: !this.state.isSubs })
    }
    onChangeHandler = (e) => {
        this.setState({ index: e.target.value })
    }

    renderFlow = () => {
        if (this.state.index == 1) {
            return <Col md={{ offset: 1 }} className="mt-2" >
                <ChannelPhotos />
            </Col>
        } else {
            return <Col className="mt-2" >
                <PhotoGalery />
            </Col>
        }
    }
    onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(this.state.model.file)
        if (Object.keys(this.state.model.file).length === 0) this.setIsBlock(true)
        else {
            this.setIsBlock(false)
        }
    }
    setIsBlock = (val) => this.setState({ isBlock: val })
    render() {
        const SubsButton = ({ isSubs }) => {
            if (isSubs) {
                return <Button variant="danger" onClick={this.setIsSubs} className="btn-lg mb-3 bottom-right"><Badge pill variant="secondary">1.9k</Badge>{" "}Abonelikten çık</Button>
            } else {
                return <Button variant="outline-danger" onClick={this.setIsSubs} className="btn-lg mb-3 bottom-right "><Badge pill variant="secondary">1.9k</Badge>{" "}Abone ol</Button>
            }
        }
        return (
            <div>
                <Navi />
                <Container>
                    <Row >
                        <Col md="12">
                            <div className="containerImg" >
                                <Image cloudName="dwebpzxqn" publicId="rgjfrvw9645y6tcux2i1" className="img-fluid"  >
                                    <Transformation width="1102" height="250" crop="pad" background="auto:predominant" />
                                </Image>
                                <SubsButton isSubs={this.state.isSubs} />
                                <div class="text-ChannelName">
                                    <h4 >-----Kanal Adı-----</h4>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3">
                            <Row className="mb-2">
                                <Col>
                                    <Form noValidate onSubmit={this.onSubmitHandler}>

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
                                            <Form.Control.Feedback type="invalid" style={{ display: this.state.isBlock ? "block" : "none" }}>
                                                Fotoğraf seçiniz
                                            </Form.Control.Feedback>

                                        </FormGroup>
                                        <Button type="submit" block variant="outline-secondary">Yükle</Button>
                                    </Form>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <ListGroup>
                                        <ListGroup.Item><Link>Kanal hakkında</Link></ListGroup.Item>
                                        <ListGroup.Item><Link>Kanal Ayarları</Link> </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="9"  >
                            <ButtonToolbar className="d-flex flex-column mt-3 mb-3" >
                                <ToggleButtonGroup type="radio" name="options" defaultValue={1} >
                                    <ToggleButton onChange={this.onChangeHandler} name="sharedPhotos" className="rounded-0" value={2} >Galeri</ToggleButton>
                                    <ToggleButton onChange={this.onChangeHandler} name="likedPhotos" className="rounded-0" value={1} >Akış</ToggleButton>
                                </ToggleButtonGroup>
                            </ButtonToolbar>

                            <Row>
                                {
                                    this.renderFlow()
                                }
                            </Row>
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
            photoCreateApi: bindActionCreators(photoActions.photoCreateApi, dispatch)
        }
    }
}

export default connect(null, mapDispatchToProps)(ChannelDetail);