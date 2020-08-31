import React, { useState, useEffect } from "react"
import { Container, Row, Col, Card, Media, InputGroup, FormControl, ListGroup, Dropdown, Modal, Form, Badge, ButtonToolbar, ToggleButtonGroup, ToggleButton, Tabs, Tab, Table } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { getChannelSubscribersPath, SUBS_API_URL, deleteSubsPath } from "../../redux/actions/subscrib/subsEndPoints"
import { getChannelPhotosPath } from "../../redux/actions/photo/photoEndPoints"
import { authHeaderObj } from "../../redux/helpers/localStorageHelper"
import PhotoCardHook from "../photoCard/photoCardHook";
import { getIsSubsApi } from "../../redux/actions/subscrib/subsAsyncAction";
import { getIsSubsSuccess } from "../../redux/actions/subscrib/subsActionCreators";
import { getChannelCategoriesApi } from "../../redux/actions/channel/channelAsyncActions";
import { PhotoGalery } from "../photos/PhotoGalery";
import { redirectErrPage } from "../../redux/helpers/historyHelper";
import { getChannelOwnerPath } from "../../redux/actions/channel/channelEndPoints";

export function SubsButton({ channelId, subsCount }) {

    const isSubs = useSelector(state => state.isSubsReducer);
    const [subsCnt, setSubsCnt] = useState(subsCount)
    const history = useHistory()
    const isLogged = useSelector(state => state.isLoggedReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        setSubsCnt(subsCount);
        if (isLogged) {
            dispatch(getIsSubsApi(channelId));
        }
    }, [subsCount])
    const subs = () => {
        var fd = new FormData();
        fd.append("channelId", channelId)
        axios.post(SUBS_API_URL, fd, { headers: authHeaderObj() }).then(() => {
            setSubsCnt(prevState => prevState + 1)
            dispatch(getIsSubsSuccess(true))
        }).catch(err => redirectErrPage(history, err));
    }
    const unsubs = () => {
        axios.delete(deleteSubsPath(channelId), { headers: authHeaderObj() }).then(() => {
            setSubsCnt(prevState => prevState - 1)
            dispatch(getIsSubsSuccess(false))
        }).catch(err => redirectErrPage(history, err));
    }
    if (!isLogged) {
        return (<JustSubsButton variant="outline-primary" subsCount={subsCnt} onClick={() => history.push('/login')} text="Abone ol" />)
    }

    return isSubs ? <JustSubsButton variant="primary" subsCount={subsCnt} onClick={unsubs} text="Abone olundu" /> :
        <JustSubsButton variant="outline-primary" subsCount={subsCnt} onClick={subs} text="Abone ol" />

}
function JustSubsButton({ text, subsCount, variant, onClick }) {
    return <Button variant={variant} onClick={onClick} className="btn-lg mb-3 bottom-right ">
        <Badge pill variant="secondary">{subsCount}</Badge>{" " + text}
    </Button>
}

export function ChannelPhotos({ channelId }) {

    const [photos, setPhotos] = useState([]);
    useEffect(() => {
        axios.get(getChannelPhotosPath(channelId)).then(res => setPhotos(res.data))
    }, [])
    return <div className="mt-3">
        {
            photos.map((p, i) => {
                return <PhotoCardHook
                    width="41rem"
                    key={i}
                    photo={{
                        publicId: p.photoPublicId,
                        likeCount: p.likeCount,
                        commentCount: p.commentCount,
                        userId: p.userId,
                        userName: p.userName,
                        shareDate: p.shareDate,
                        photoId: p.photoId,
                        channelId: p.channelId,
                        channelName: p.channelName,
                        channelPublicId: p.channelPublicId
                    }} />
            })
        }
    </div>
}
export function Flow({ renderState, channelId }) {
    const [flowState, setFlowState] = useState();
    useEffect(() => setFlowState(renderState), [renderState])
    return <div>
        <Row>
            <Col md="12">
                <Tabs
                    id="controlled-tab-example"
                    activeKey={flowState}
                    onSelect={(k) => setFlowState(k)}
                >
                    <Tab eventKey="gallery" title="Galeri">
                        <Col >
                            <PhotoGalery channelId={channelId} />
                        </Col>
                    </Tab>
                    <Tab eventKey="photos" title="Fotoğraflar">
                        <Col md={{ offset: 1 }}>
                            <ChannelPhotos channelId={channelId} />
                        </Col>
                    </Tab>
                    <Tab eventKey="about" title="Kanal Hakkında">
                        <Col>
                            <ChannelAbout channelId={channelId} />
                        </Col>

                    </Tab>
                </Tabs>
            </Col>
        </Row>
    </div>
}

export function ChannelCategories({ channelId }) {
    const categories = useSelector(state => state.channelReducer.categories);
    const dispatch = useDispatch();
    const history = useHistory()
    useEffect(() => {
        dispatch(getChannelCategoriesApi(channelId, history));
    }, [channelId])

    return <ListGroup>
        <ListGroup.Item>
            {
                categories.map((c, i) => {
                    return <h4 className="d-inline-flex mr-2" key={i}><Link to="#"><Badge variant="info">
                        {c.name}
                    </Badge></Link></h4>
                })
            }
        </ListGroup.Item>
        <ListGroup.Item><Link className="text-decoration-none" to={channelId + "/settings"}>Kanal Ayarları</Link> </ListGroup.Item>
    </ListGroup>
}


export function ChannelAbout({ channelId }) {
    const channelDetail = useSelector(state => state.channelReducer.channelDetail);
    const [subscribers, setSubscribers] = useState([])
    const [owner, setOwner] = useState({})
    const history = useHistory()
    useEffect(() => {
        axios.get(getChannelOwnerPath(channelId)).then(res => {
            setOwner(res.data);
            console.log(res.data)
            axios.get(getChannelSubscribersPath(channelId)).then(res => {

                setSubscribers(res.data)
            }).catch(err => {
                console.log(err)
                redirectErrPage(history, err)
            })
        }).catch(err => {
            console.log(err);
            redirectErrPage(history, err)
        })
    }, [channelId])

    return <Container>
        <Row className="mt-4">
            <Col>
                <h3 className="font-weight-normal d-inline-flex ">{channelDetail.name}</h3>
                <h6 className="font-weight-light d-inline-flex  float-right mt-4">{channelDetail.createdDate ? channelDetail.createdDate.split("T")[0] : null}</h6>
                <hr />
            </Col>
        </Row>
        <Row>
            <Col>
                <h4 className="text-primary">Aboneler <Badge variant="primary">{channelDetail.subscribersCount}</Badge></h4>
                <hr />
                <Table striped hover>
                    <tbody>
                        {
                            subscribers.map(subs => {
                                return <tr key={subs.id}>
                                    <td>
                                        <span>{subs.firstName + " " + subs.lastName}</span>
                                        <Link to={"/profile/" + subs.id} className="text-primary text-decoration-none"><h6 className="float-right">{subs.userName}</h6></Link>
                                    </td>
                                </tr>
                            })
                        }

                    </tbody>
                </Table>
            </Col>

            <Col>
                <h4 className="text-dark">Kanal Sahibi</h4>
                <hr />
                <Table striped hover>
                    <tbody>
                        <tr>
                            <td style={{ width: 3 }}>
                                <b>{owner.firstName + " " + owner.lastName}</b>
                                <Link to={"/profile/" + owner.id} className="text-decoration-none"><h6 className="float-right">{owner.userName}</h6></Link>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>
    </Container>
}