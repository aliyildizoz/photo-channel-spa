import React, { useState, useEffect } from "react"
import { Container, Row, Col, ListGroup, Badge, Tabs, Tab, Table } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { SUBS_API_URL, deleteSubsPath } from "../../redux/actions/subscrib/subsEndPoints"
import { authHeaderObj } from "../../redux/helpers/localStorageHelper"
import PhotoCardHook from "../photoCard/photoCardHook";
import { getIsSubsApi } from "../../redux/actions/subscrib/subsAsyncAction";
import { getIsSubsSuccess, getSubscribersSuccess } from "../../redux/actions/subscrib/subsActionCreators";
import PhotoGallery from "../photos/PhotoGallery";
import { redirectErrPage } from "../../redux/helpers/historyHelper";
import { getChannelOwnerPath } from "../../redux/actions/channel/channelEndPoints";
import { getIsOwnerSuccess } from "../../redux/actions/channel/channelActionCreators";
import moment from 'moment';
export function SubsButton({ channelId, subsCount }) {
    const subscribers = useSelector(state => state.channelReducer.subscribers);
    const currentUser = useSelector(state => state.currentUserReducer)
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
            console.log("subs")
            console.log(subscribers)
            console.log(currentUser)
            dispatch(getSubscribersSuccess([...subscribers, { firstName: currentUser.firstName, lastName: currentUser.lastName, id: currentUser.id, userName: currentUser.userName }]))
        }).catch(err => redirectErrPage(history, err));
    }
    const unsubs = () => {
        axios.delete(deleteSubsPath(channelId), { headers: authHeaderObj() }).then(() => {
            setSubsCnt(prevState => prevState - 1);
            dispatch(getIsSubsSuccess(false));
            console.log("unsubs")

            console.log(subscribers)
            console.log(currentUser)
            dispatch(getSubscribersSuccess([...subscribers.filter(s => s.id !== currentUser.id)]))

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
    const history = useHistory();
    const dispatch = useDispatch();
    const channelPhotos = useSelector(state => state.channelReducer.channelPhotos);
    return <div className="mt-3">
        {
            channelPhotos.map((p, i) => {
                return <PhotoCardHook
                    cardWidth="41rem"
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
                            <PhotoGallery channelId={channelId} />
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
    </ListGroup>
}


export function ChannelAbout({ channelId }) {
    const channelDetail = useSelector(state => state.channelReducer.channelDetail);
    const subscribers = useSelector(state => state.channelReducer.subscribers);
    const [owner, setOwner] = useState({})
    const history = useHistory()
    const currentUserId = useSelector(state => state.currentUserReducer.id)
    const isOwner = useSelector(state => state.isOwnerReducer)
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get(getChannelOwnerPath(channelId)).then(res => {
            setOwner(res.data)
            dispatch(getIsOwnerSuccess(currentUserId === res.data.id))
        }
        ).catch(err => {
            console.log(err);
            redirectErrPage(history, err)
        })
    }, [channelId, currentUserId])

    return <Container>
        <Row className="mt-4">
            <Col>
                <h3 className="font-weight-normal d-inline-flex ">{channelDetail.name}</h3>
                <h6 className="font-weight-light d-inline-flex  float-right mt-4">  {moment(channelDetail.createdDate).format("DD.MM.YYYY")}</h6>

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
                <h4 className=" d-inline-flex text-dark">Kanal Sahibi</h4>
                {
                    isOwner ?
                        <h5 className="font-weight-light d-inline-flex  float-right mt-4">  <Link className="text-decoration-none" to={channelId + "/settings"}> <span className="fa fa-cog"></span> Ayarlara git</Link></h5> : null
                }
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