import React, { useState, useRef, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Col, Form, FormGroup, Button, ListGroup, Modal, Accordion, Alert } from "react-bootstrap"
import { Multiselect } from 'multiselect-react-dropdown';
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { deleteSubsByOwnerPath } from "../../redux/actions/subscrib/subsEndPoints";
import { authHeaderObj } from "../../redux/helpers/localStorageHelper";
import { getSubscribersApi, channelUpdateApi, addChannelCategoriesApi } from "../../redux/actions/channel/channelAsyncActions";
import { getChannelPathById } from "../../redux/actions/channel/channelEndPoints";
import { redirectErrPage } from "../../redux/helpers/historyHelper";
import SimpleReactValidator from "simple-react-validator";

import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import { toast } from "react-toastify";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginImageExifOrientation);

export function ChannelUpdate({ channelId }) {

    const channelDetail = useSelector(state => state.channelReducer.channelDetail)
    const apiResponse = useSelector(state => state.apiResponseReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [, forceUpdate] = useState()
    const validator = useRef(new SimpleReactValidator({ locale: "tr", autoForceUpdate: { forceUpdate: forceUpdate } }))

    const [name, setName] = useState("")
    const [files, setFiles] = useState([])

    useEffect(() => {
        setName(channelDetail.name)
    }, [])
    const onChangeHandler = (e) => {
        setName(e.target.value)
        validator.current.showMessages();
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (validator.current.allValid() || files.length > 0) {
            dispatch(channelUpdateApi({ name: name, file: files[0] }, channelId));
            navigate("/channel/" + channelId);
        } else {
            validator.current.showMessages();
        }
    }
    return <Col>
        <h5>Kanalı güncelle</h5>
        <hr />
        <Form onSubmit={onSubmitHandler} className="mb-3">

            <FormGroup>
                <Form.Control type="text" name="name" onChange={onChangeHandler} placeholder="Kanal adı" defaultValue={channelDetail.name} />
                {validator.current.message('name', name, 'required', { className: 'text-danger' })}
                {validator.current.messageWhenPresent(apiResponse.message, { className: 'text-danger' })}
            </FormGroup>

            <FilePond
                allowMultiple={false}
                onupdatefiles={imageFile => setFiles(imageFile.map(f => f.file))}
                labelIdle='Kanal fotoğrafını değiştirmek için fotoğrafı sürükle bırak veya <strong class="filepond--label-action">seç</strong>'
                acceptedFileTypes={['image/*']}
                files={files}
            />
            <Button type="submit" className="mt-2" block>Kaydet</Button>
        </Form>
    </Col>
}

export function CategoryUpdate({ channelId }) {
    const channelCategories = useSelector(state => state.channelReducer.categories)
    const allCategories = useSelector(state => state.categoryListReducer)
    const [selectedCategories, setSelectedCategories] = useState([])
    const dispatch = useDispatch()

    const onChange = (e) => {
        setSelectedCategories(e)
    }
    const onClickHandler = (e) => {
        if (selectedCategories.length > 0) {
            console.log(selectedCategories);
           dispatch(addChannelCategoriesApi(selectedCategories, channelId))
        }
    }
    return <Col >
        <h5>Kategori seç</h5>
        <hr className="mb-2" />
        <Multiselect
            options={allCategories}
            selectedValues={channelCategories}
            displayValue="name"
            closeIcon="circle"
            style={{ chips: { background: "#5bc0de" } }}
            onSelect={onChange}
            onRemove={onChange}
            placeholder="Kategori seç"
        />
        <Button type="submit" onClick={onClickHandler} className="mt-2" block>Kaydet</Button>

    </Col>
}
export function ChannelDelete({ channelId }) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onClickHandler = () => {
        console.log(getChannelPathById(channelId));
        axios.delete(getChannelPathById(channelId), {
            headers: authHeaderObj()
        }).then(() => navigate("/")).then(() => toast.success("Kanal silindi.")).catch(err => redirectErrPage(err, dispatch))
    }
    return <Col className="mt-2">
        <Accordion>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                <h5 className="text-danger"> Kanalı Sil <span className="far fa-trash-alt  "></span></h5>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
                <Alert variant="danger">Kanalı silmek istediğinden emin misin ? <Button variant="danger" onClick={onClickHandler} className="ml-2">Evet</Button></Alert>
            </Accordion.Collapse>
        </Accordion>
    </Col>
}
export function Subscribers({ channelId }) {
    const subscribers = useSelector(state => state.channelReducer.subscribers)
    const [modalShow, setModalShow] = useState(false)
    const [deleteId, setDeleteId] = useState(0)
    const dispatch = useDispatch()
    const removeSubs = (userId) => {
        axios.delete(deleteSubsByOwnerPath(channelId, userId), {
            headers: authHeaderObj()
        }).then(() => dispatch(getSubscribersApi(channelId))).then(() => setModalShow(false)).then(() => toast.success("Kullanıcı silindi.")).catch((err) => redirectErrPage(err, dispatch))
    }

    return <div>
        <h3 className="font-weight-normal mt-2 d-inline-flex">Aboneler</h3>
        <h6 className="font-weight-light d-inline-flex  float-right mt-4">Abone sayısı: <b>{subscribers.length}</b></h6>
        <hr />
        <div className="overflow-auto" style={{ height: 500 }}>
            <ListGroup >
                {
                    subscribers.map(subs => {
                        return <ListGroup.Item key={subs.id} class="d-flex justify-content-between">

                            <Link to={"/profile/" + subs.id} className="text-primary text-decoration-none"><span>{subs.firstName + " " + subs.lastName}</span></Link>
                            <span onClick={() => { setModalShow(true); setDeleteId(subs.id); }} className="removeSubsSpan fas fa-user-minus"></span>

                        </ListGroup.Item>
                    })
                }
            </ListGroup>
        </div>
        <RemoveSubsModal show={modalShow} onHide={() => setModalShow(false)} removeSubs={() => removeSubs(deleteId)} />
    </div>
}

function RemoveSubsModal({ onHide, removeSubs, show }) {

    return <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title><span className="fas fa-user-minus text-danger mr-2"></span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h5>Aboneyi silmek istediğinden emin misin ?</h5>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>İptal</Button>
            <Button variant="danger" onClick={removeSubs}>Sil</Button>
        </Modal.Footer>
    </Modal>
}