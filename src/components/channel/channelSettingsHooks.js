import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Col, Form, FormGroup, Button, ListGroup, Modal } from "react-bootstrap"
import { FilePond } from "react-filepond"
import { Typeahead } from "react-bootstrap-typeahead"
import { Link } from "react-router-dom"

export function ChannelUpdate({ channelId }) {

    const channelDetail = useSelector(state => state.channelReducer.channelDetail)
    const [model, setModel] = useState({})
    const [isChange, setisChange] = useState(false)
    const onChangeHandler = (e) => {
        setModel({ ...model, name: e.target.value, channelId: channelId })
        setisChange(true)
    }
    const onSubmitHandler = () => {

    }
    return <Col>
        <h5>Kanalı güncelle</h5>
        <hr />
        <Form onSubmit={onSubmitHandler} className="mb-3">

            <FormGroup>
                <Form.Control type="text" name="name" onChange={onChangeHandler} required placeholder="Kanal adı" defaultValue={channelDetail.name} />
            </FormGroup>
            <FilePond
                allowMultiple={false}
                onupdatefiles={imageFile => setModel({ ...model, files: imageFile.map(f => f.file), channelId: channelId })}
                labelIdle='Kanal fotoğrafını değiştirmek için fotoğrafı sürükle bırak veya <strong class="filepond--label-action">seç</strong>'
                acceptedFileTypes={['image/*']}
            />
            <Button type="submit" className="mt-2" block>Kaydet</Button>
        </Form>
    </Col>
}

export function CategoryUpdate({ channelId }) {
    const channelCategories = useSelector(state => state.channelReducer.categories)
    const allCategories = useSelector(state => state.categoryListReducer)
    const [model, setModel] = useState({})
    const [isChange, setisChange] = useState(false)
    const onChangeHandler = (e) => {
        console.log(e)
        setModel({ channelId: channelId, categoryIds: e.map(c => c.id) })
        setisChange(true)
    }
    const onSubmitHandler = () => {
        //
    }

    return <Col >
        <h5>Kategori seç</h5>
        <hr />
        {console.log(channelCategories)}
        <Form onSubmit={onSubmitHandler}>
            <FormGroup>
                <Typeahead
                    clearButton
                    defaultSelected={channelCategories}
                    id="selections-example"
                    labelKey="name"
                    multiple
                    options={allCategories}
                    placeholder="Kategori seç"
                    className="mb-3"
                    onChange={onChangeHandler}
                    required

                />
            </FormGroup>
            <Button type="submit" block>Kaydet</Button>
        </Form>
    </Col>
}

export function Subscribers() {
    const subscribers = useSelector(state => state.channelReducer.subscribers)
    const [modalShow, setModalShow] = useState(false)
    const removeSubs = () => {

    }

    return <div>
        <h5>Aboneler</h5>
        <hr />
        <div className="overflow-auto" style={{ height: 500 }}>
            <ListGroup >
                {
                    subscribers.map(subs => {
                        return <ListGroup.Item key={subs.id}>

                            <Link to={"/profile/" + subs.id} className="text-primary text-decoration-none"><span>{subs.firstName + " " + subs.lastName}</span></Link>
                            <span onClick={() => setModalShow(true)} className="removeSubsSpan float-right fas fa-user-minus"></span>

                        </ListGroup.Item>
                    })
                }
            </ListGroup>
        </div>
        <RemoveSubsModal show={modalShow} onHide={() => setModalShow(false)} removeSubs={() => removeSubs()} />
    </div>
}

function RemoveSubsModal(props) {

    return <Modal {...props}>
        <Modal.Header closeButton>
            <Modal.Title><span className="fas fa-user-minus text-danger mr-2"></span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h5>Aboneyi silmek istediğinden emin misin ?</h5>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>İptal</Button>
            <Button variant="danger" onClick={props.removeSubs}>Sil</Button>
        </Modal.Footer>
    </Modal>
}