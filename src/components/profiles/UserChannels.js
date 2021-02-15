import React, { Component, useRef, useState } from 'react'
import { Container, Row, Col, Table, Media, Badge, Button, Alert, Form, FormGroup } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom'
import Image from 'cloudinary-react/lib/components/Image/Image'
import Transformation from 'cloudinary-react/lib/components/Transformation/Transformation'
import { connect, useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserChannelsApi } from '../../redux/actions/channel/channelAsyncActions'
import SimpleReactValidator from 'simple-react-validator'
import { FilePond, registerPlugin, } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import { CHANNEL_PATH } from '../../redux/actions/channel/channelEndPoints'
import axios from 'axios'
import { authHeaderObj } from '../../redux/helpers/localStorageHelper'
import { redirectErrPage } from '../../redux/helpers/historyHelper'

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginImageExifOrientation);

class UserChannels extends Component {
    state = {
        isMainContent: true
    }
    componentDidMount = () => {
        this.props.actions.getUserChannels(this.props.match.params.id);
    }
    render() {
        return (
            <div>
                <Container>
                    <Row className="mt-3">
                        <Col md={{ span: 6, offset: 3 }}>
                            <h4 className="d-inline-flex text-primary cursorPointer" onClick={() => this.setState({ isMainContent: true })}>
                                <span className="hoverBlue">Kanallar</span>
                            </h4>
                            <Badge variant="dark" className="ml-2 text-decoration-none">{this.props.userChannels.length}</Badge>
                            {this.props.isOwner ? <div className="d-inline-flex float-right">
                                <h4 className="text-success cursorPointer " onClick={() => this.setState({ isMainContent: false })} >
                                    <span className="hoverGreen"><i className="fas fa-plus-circle mr-1 mt-1 text-dark"></i> Yeni kanal</span>
                                </h4>
                            </div> : null}
                            <hr />
                            {
                                this.state.isMainContent ? this.props.userChannels.length === 0 ?
                                    <h6 className="font-weight-normal"><i>Bu kişinin herhangi bir kanalı bulunmamaktadır.</i></h6> : <Table striped hover>
                                        <MapChannelList isCog={this.props.isOwner} channelList={this.props.userChannels} />
                                    </Table> : this.props.isOwner ? <ChannelCreate /> : null

                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        userChannels: state.userReducer.userChannels,
        isOwner: state.userReducer.isOwner,
        currentUser: state.currentUserReducer
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getUserChannels: bindActionCreators(getUserChannelsApi, dispatch)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserChannels);

function MapChannelList({ channelList, isCog }) {
    return <tbody>{isCog ? channelList.map(channel => {
        return <tr key={channel.id}>
            <td style={{ width: 3 }}>
                <Media>
                    <Link to={"/channel/" + channel.id} className="text-decoration-none " >
                        <Image cloudName="dwebpzxqn" publicId={channel.publicId} className="mr-2"  >
                            <Transformation width={40} height={40} gravity="auto" crop="fill" radius="10" />
                        </Image>
                    </Link>

                </Media>
            </td>
            <td className="align-middle">
                <Link to={"/channel/" + channel.id} className="text-decoration-none">
                    {channel.name}
                </Link>
            </td>
            <td className="float-right align-middle">
                <Link className="text-decoration-none" to={"/channel/" + channel.id + "/settings"}> <span className="fa fa-cog fa-2x"></span></Link>
            </td>
        </tr>
    }) : channelList.map(channel => {
        return <tr key={channel.id}>
            <td style={{ width: 3 }}>
                <Media>
                    <Link to={"/channel/" + channel.id} className="text-decoration-none " >
                        <Image cloudName="dwebpzxqn" publicId={channel.publicId} className="mr-2"  >
                            <Transformation width={40} height={40} gravity="auto" crop="fill" radius="10" />
                        </Image>
                    </Link>

                </Media>
            </td>
            <td className="align-middle">
                <Link to={"/channel/" + channel.id} className="text-decoration-none">
                    {channel.name}
                </Link>
            </td>
        </tr>
    })}</tbody>
}

function ChannelCreate() {

    const dispatch = useDispatch()
    const history = useHistory()

    const [, forceUpdate] = useState()
    const validator = useRef(new SimpleReactValidator({ locale: "tr", autoForceUpdate: { forceUpdate: forceUpdate } }))

    const [name, setName] = useState("")
    const [files, setFiles] = useState([])
    const [fileMessage, setFileMessage] = useState()
    const [apiResponse, setApiResponse] = useState()
    const setFileValid = (message = "Lütfen bir fotoğraf seçiniz.") => setFileMessage(message)
    const onChangeHandler = (e) => {
        setName(e.target.value)
        validator.current.showMessages();
        setApiResponse("");
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (files.length > 0 && validator.current.allValid()) {
            const fd = new FormData();
            fd.append("file", files[0]);
            fd.append("name", name);
            await axios.post(CHANNEL_PATH, fd, {
                headers: authHeaderObj()
            }).then((res) => {
                console.log(res.data);
                history.push("/channel/" + res.data.id);
            }).catch(err => {
                 console.log(err)
                if (err.response.status === 400) {
                    setApiResponse(err.response.data)
                } else {
                    redirectErrPage(err,dispatch)
                }
            })
        } else {
            if (files.length === 0) {
                setFileValid();
                validator.current.showMessages();
            }
        }
    }

    return <div>
        <h5 className="text-success">Yeni Kanal</h5>
        <hr />
        <Form onSubmit={onSubmitHandler} className="mb-3">

            <FormGroup>
                <Form.Control type="text" name="name" onChange={onChangeHandler} placeholder="Kanal adı" />
                {validator.current.message('name', name, 'required', { className: 'text-danger' })}
                {validator.current.messageWhenPresent(apiResponse, { className: 'text-danger' })}
            </FormGroup>

            <FilePond
                allowMultiple={false}
                onupdatefiles={imageFile => {
                    var files = imageFile.map(f => f.file)
                    setFiles(files);
                    files.length > 0 ? setFileValid("") : setFileValid()
                }}
                labelIdle='Kanal fotoğrafını seçmek için fotoğrafı sürükle bırak veya <strong class="filepond--label-action">seç</strong>'
                acceptedFileTypes={['image/*']}
                files={files}
            />
            {validator.current.messageWhenPresent(fileMessage, { className: 'text-danger' })}
            <Button type="submit" variant="success" className="mt-2" block>Oluştur</Button>
        </Form>
    </div>

}