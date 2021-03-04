import React, { useState, useEffect, useRef } from "react"
import { Container, Row, Col, Card, Media, InputGroup, FormControl, ListGroup, Dropdown, Modal, Form, ModalBody } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import Image from 'cloudinary-react/lib/components/Image/Image';
import { Transformation } from 'cloudinary-react';
import { COMMENT_PATH, getPhotoCommentsUrl, getCommentPathById } from "../../redux/actions/comment/commentEndPoints"
import { getPhotoLikesUrl, getIsLikePath, deleteLikePath, LIKE_API_URL } from "../../redux/actions/like/likeEndPoints"
import { authHeaderObj } from "../../redux/helpers/localStorageHelper"
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";
import { redirectErrPage } from "../../redux/helpers/historyHelper";
import { photoDeleteApi } from "../../redux/actions/photo/photoAsyncActions";
import { getChannelPhotosSuccess } from "../../redux/actions/photo/photoActionCreators";
import { getLikedPhotosSuccess, getUserCommentsPhotosSuccess, getUserPhotosSuccess } from "../../redux/actions/user/userActionsCreators";
import { profileFlowState } from "../../redux/constants/constants";
import _ from 'lodash'

const datePatt = /.+\s\d+[:]\d+/g;

function PhotoCardHook({ refreshPhotos, removeButton = false, photo, cardWidth = "41rem", bodyShowIndex = 0, className = "mt-5" }) {

    const [photoModalShow, setPhotoModalShow] = useState(false);
    const [cardBodyShow, setCardBodyShow] = useState(bodyShowIndex);
    const [isOwner, setIsOwner] = useState(removeButton);
    const currentUser = useSelector(state => state.currentUserReducer)
    const [likeCnt, setlikeCnt] = useState(photo.likeCount)
    const [commentCount, setCommentCount] = useState(photo.commentCount);
    const [isLike, setIsLike] = useState(false)
    const isLogged = useSelector(state => state.isLoggedReducer);
    const setlikeCount = (isLike) => {
        isLike ? setlikeCnt(likeCnt + 1) : setlikeCnt(likeCnt - 1);
    }
    useEffect(() => {
        if (removeButton) setIsOwner(currentUser.detail.id === photo.userId)
        setCommentCount(photo.commentCount)
        setCardBodyShow(bodyShowIndex)
        setlikeCnt(photo.likeCount)
        if (isLogged) {
            axios.get(getIsLikePath(photo.photoId), { headers: authHeaderObj() }).then(res => setIsLike(res.data))
        }
    }, [photo, bodyShowIndex, currentUser, removeButton, setIsLike, isLogged]);

    return (
        <Card border="light" className={"shadow-lg  bg-white rounded " + className} style={{ width: cardWidth, height: "auto" }}>

            <PhotoCardHeader refreshPhotos={refreshPhotos} photoId={photo.photoId} isOwner={isOwner} channelId={photo.channelId} channelName={photo.channelName} channelPublicId={photo.channelPublicId} />

            <div style={{ cursor: "pointer" }} onClick={() => setPhotoModalShow(true)}> <Image cloudName="dwebpzxqn" publicId={photo.photoPublicId} className="card-img-top img-fluid">
                <Transformation aspectRatio="1.5" crop="crop" />
            </Image></div>
            <PhotoModal
                show={photoModalShow}
                onHide={() => setPhotoModalShow(false)}
                publicId={photo.photoPublicId}
                photoUrl={photo.photoUrl}
            />
            <PhotoCardBody
                shareDate={photo.shareDate}
                likeCount={likeCnt}
                commentCount={commentCount}
                userName={photo.userName}
                userId={photo.userId}
                setCommentShow={() => setCardBodyShow(1)}
                setLikesShow={() => setCardBodyShow(2)}
                photoId={photo.photoId}
                setlikeCount={setlikeCount}
                isLike={isLike}
                setIsLike={setIsLike}
            />


            <PhotoCardFooter
                currentUserId={currentUser.detail.id}
                likeCount={likeCnt}
                photoId={photo.photoId}
                cardBodyShow={cardBodyShow}
                hideCardBody={() => setCardBodyShow(0)}
                commentCountDec={() => setCommentCount(commentCount - 1)}
                commentCountInc={() => setCommentCount(commentCount + 1)}
            />

        </Card>
    )
}
export default PhotoCardHook;


export function MapPhotoCard({ refreshPhotos, removeButton = false, photos, cardWidth = "41rem", bodyShowIndex = 0, notFoundText = "Herhangi bir fotoğraf bulunmamaktadır." }) {
    return <div>{
        photos.length > 0 ? photos.map((p, i) => {
            return <PhotoCardHook
                cardWidth={cardWidth}
                key={i}
                photo={{
                    photoPublicId: p.photoPublicId,
                    likeCount: p.likeCount,
                    commentCount: p.commentCount,
                    userId: p.userId,
                    userName: p.userName,
                    shareDate: p.shareDate,
                    photoId: p.photoId,
                    channelId: p.channelId,
                    channelName: p.channelName,
                    channelPublicId: p.channelPublicId,
                    photoUrl: p.photoUrl
                }}
                removeButton={removeButton}
                bodyShowIndex={bodyShowIndex}
                className={i !== 0 ? "mt-5" : ""}
                refreshPhotos={() => refreshPhotos(p.photoId)}
            />

        }) : <h6 className="font-weight-normal"><i>{notFoundText}</i></h6>
    }</div>
}

function PhotoCardFooter({ currentUserId, likeCount, photoId, cardBodyShow, hideCardBody, commentCountDec, commentCountInc }) {

    switch (cardBodyShow) {
        case 1:
            return <Card.Footer><PhotoCardComments countDec={commentCountDec} countInc={commentCountInc} currentUserId={currentUserId} photoId={photoId} hideCardBody={hideCardBody} /> </Card.Footer >
        case 2:
            return likeCount > 0 ? <Card.Footer > <PhotoCardLikes photoId={photoId} hideCardBody={hideCardBody} /></Card.Footer > : null
        default:
            return null;
    }
}
function PhotoCardHeader({ refreshPhotos, photoId, isOwner, channelId, channelPublicId, channelName }) {
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const dispatch = useDispatch();

    const deletePhotoClick = () => {
        dispatch(photoDeleteApi(photoId))
        setDeleteModalShow(false);
        refreshPhotos();
    }
    return (
        <Card.Header >

            <Media className="d-inline-flex">
                <Link to={"/channel/" + channelId}>
                    <Image cloudName="dwebpzxqn" publicId={channelPublicId} className="mr-2"  >
                        <Transformation width={25} height={25} gravity="auto" crop="fill" radius="5" />
                    </Image>
                </Link>
                <Link className="text-decoration-none" to={"/channel/" + channelId}>
                    {channelName}
                </Link>

            </Media>
            {
                isOwner ? <Dropdown drop="left" className="d-inline-flex float-right dropleft">
                    <Dropdown.Toggle as={CustomToggle} className="dropleft"></Dropdown.Toggle>

                    <Dropdown.Menu >
                        <Dropdown.Item onClick={() => { setDeleteModalShow(true); }} eventKey="2"><span className="far fa-trash-alt text-danger mr-2"></span> Sil</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> : null
            }
            <DeletePhotoModal
                show={deleteModalShow}
                onHide={() => setDeleteModalShow(false)}
                delete={deletePhotoClick}
            />
        </Card.Header>
    )
}

function PhotoCardBody({ setIsLike, isLike, photoId, likeCount, commentCount, userName, userId, shareDate, setLikesShow, setCommentShow, setlikeCount }) {

    return (
        <Card.Body style={{ paddingTop: 0 }} className="pl-2">

            <p style={{ fontSize: 16 }} className="text-muted d-inline-flex mb-0 mr-2">
                <button onClick={setLikesShow} style={{ padding: 0 }} type="button" className="btn btn-link">
                    <i className="fa  fa-thumbs-up text-primary ml-2 mr-2"></i>{likeCount} </button>
                <b className="ml-2 ">·</b>
            </p>
            <p style={{ fontSize: 16 }} className="text-muted d-inline-flex mb-0">
                <button onClick={setCommentShow} style={{ padding: 0 }} type="button" className="btn btn-link text-dark">{commentCount} Yorum</button>
            </p>

            <p className="text-muted d-inline-flex mb-0">
                <b className="ml-2 ">·</b>
                <Link to={"/profile/" + userId} className="ml-2 ">{userName}</Link>
            </p>

            <hr style={{ margin: 5 }} />

            <LikeButton photoId={photoId} setlikeCount={setlikeCount} isLike={isLike} setIsLike={setIsLike} />
            <Button variant="dark" onClick={setCommentShow} className="btn-sm ml-2" style={{ borderRadius: 0 }}>
                <i className="fa  fa-comment" style={{ fontSize: 16 }}></i>&nbsp;&nbsp;Yorum Yap</Button>
            <div className="d-inline-flex font-weight-lighter float-right">{new Date(shareDate).toLocaleString().match(datePatt).toString().replace(" ", " - ")}</div>
        </Card.Body>
    )
}

function LikeButton({ isLike, setIsLike, photoId, setlikeCount }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const isLogged = useSelector(state => state.isLoggedReducer);

    const onClick = () => {
        var fd = new FormData();
        fd.append("photoId", photoId)
        if (!isLike) {
            axios.post(LIKE_API_URL, fd, { headers: authHeaderObj() }).then(() => {
                setIsLike(!isLike);
                setlikeCount(!isLike);
            }).catch(err => redirectErrPage(err, dispatch));
        }
        else {
            axios.delete(deleteLikePath(photoId), { headers: authHeaderObj() }).then(() => {
                setIsLike(!isLike);
                setlikeCount(!isLike);
            }).catch(err => redirectErrPage(err, dispatch));
        }

    }
    if (!isLogged) {
        return <Button onClick={() => history.push("/login")} variant="outline-primary" style={{ borderRadius: 0 }} className="btn-sm">
            <i className="fa  fa-thumbs-up" style={{ fontSize: 16 }}></i>&nbsp;&nbsp;Beğen</Button>
    }
    return (
        <Button onClick={onClick} variant={isLike ? "primary" : "outline-primary"} style={{ borderRadius: 0 }} className="btn-sm">
            <i className="fa  fa-thumbs-up" style={{ fontSize: 16 }}></i>&nbsp;&nbsp;Beğen</Button>
    )
}

function PhotoCardComments({ currentUserId, photoId, hideCardBody, countDec, countInc }) {

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [showValid, setShowValid] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [currentComment, setCurrentComment] = useState({});

    useEffect(() => {
        axios.get(getPhotoCommentsUrl(photoId)).then(res => { setComments(res.data) })
    }, [photoId]);
    const isLogged = useSelector(state => state.isLoggedReducer);
    const history = useHistory()
    const dispatch = useDispatch()
    const createCommentClick = () => {
        if (!isLogged) history.push("/login")

        if (newComment !== "" && newComment !== undefined) {
            setShowValid(false);

            axios.post(COMMENT_PATH, { photoId: photoId, description: newComment }, { headers: authHeaderObj() }).then((res => {
                setComments([res.data, ...comments]);
                countInc();
            })).catch(err => redirectErrPage(err, dispatch))
        } else {
            setShowValid(true);
        }

    }

    const editCommentClick = () => {
        if (currentComment.description !== "" && currentComment.description !== undefined) {
            axios.put(getCommentPathById(currentComment.commentId), { description: currentComment.description }, { headers: authHeaderObj() }).then((res => {
                comments.forEach((c, i, arr) => {
                    if (c.commentId === currentComment.commentId) {
                        arr[i].description = currentComment.description;
                    }
                })
                setComments([...comments]);
                setEditModalShow(false);
            })).catch(err => redirectErrPage(err, dispatch))

        }
    }
    const deleteCommentClick = (comment) => {

        axios.delete(getCommentPathById(comment.commentId), { headers: authHeaderObj() }).then((res => {
            setComments([...comments.filter(c => c.commentId !== comment.commentId)])
            setDeleteModalShow(false)
            countDec();
        })).catch(err => redirectErrPage(err, dispatch))

    }

    return (
        <div>
            <Row>
                <Col>
                    <InputGroup>
                        <FormControl
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={(e) => setNewComment(e.target.value)}
                            name="newComment"
                        />
                        <InputGroup.Append>
                            <Button variant="success" onClick={createCommentClick} style={{ borderRadius: 0 }}>Yorum yap</Button>
                        </InputGroup.Append>
                    </InputGroup>

                    <h6 className="text-danger font-weight-light mb-3">{showValid ? "Lütfen bir yorum yazınız." : ""}</h6>
                </Col>
            </Row>
            <Row>
                <Col md="12" >

                    {
                        comments.map(c => {
                            return <div className="p-3 mb-2 text-dark" key={c.commentId} style={{ borderRadius: 0, backgroundColor: "white" }}>
                                <div className="d-inline-flex">
                                    <Link to={"profile/" + c.userId}>
                                        {c.firstName + " " + c.lastName}
                                    </Link>
                                </div>
                                {
                                    currentUserId === c.userId ? <Dropdown drop="left" className="d-inline-flex float-right dropleft">
                                        <Dropdown.Toggle as={CustomToggle} className="dropleft"></Dropdown.Toggle>

                                        <Dropdown.Menu >
                                            <Dropdown.Item onClick={() => { setEditModalShow(true); setCurrentComment(c); }} eventKey="1"><span aria-hidden="true" className="far fa-edit text-primary mr-1"></span> Düzenle</Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item onClick={() => { setDeleteModalShow(true); setCurrentComment(c); }} eventKey="2"><span className="far fa-trash-alt text-danger mr-2"></span> Sil</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown> : null
                                }

                                <div className="d-inline-flex font-weight-light float-right">{new Date(c.shareDate).toLocaleString().match(datePatt).toString().replace(" ", " - ")}</div>

                                <hr style={{ margin: 5 }} />
                                <p className="mb-0">
                                    {c.description}
                                </p>
                            </div>
                        })
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <button onClick={hideCardBody} className="btn btn-link" style={{ padding: 0 }}>Gizle</button>
                </Col>
            </Row>
            <EditCommentModal
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
                comment={currentComment}
                setComment={setCurrentComment}
                onClickSaveChange={editCommentClick}
            />
            <DeleteCommentModal
                show={deleteModalShow}
                onHide={() => setDeleteModalShow(false)}
                delete={() => deleteCommentClick(currentComment)}
                comment={currentComment}
            />
        </div>
    )
}
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div>
        <svg onClick={onClick} ref={ref} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-three-dots-vertical dropdowncommentbutton" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>
    </div>
));
function EditCommentModal(props) {
    const onChangeCommentHandler = (e) => {
        props.setComment({ ...props.comment, description: e.target.value })
    }
    return (
        <Modal {...props} centered>
            <Modal.Header closeButton>
                <Modal.Title>Düzenle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Control onChange={onChangeCommentHandler} as="textarea" placeholder="yorum" defaultValue={props.comment.description} />
                        {props.comment.description === "" || props.comment.description === undefined ? <h6 className="text-danger font-weight-light mb-3">Lütfen bir yorum yazınız.</h6> : null}

                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>İptal</Button>

                <Button variant="primary" onClick={props.onClickSaveChange}>Kaydet</Button>
            </Modal.Footer>
        </Modal>
    );
}
function DeleteCommentModal(props) {

    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                <Modal.Title><span className="far fa-trash-alt text-danger mr-2"></span> Sil</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>{props.comment.description}</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>İptal</Button>
                <Button variant="danger" onClick={props.delete}>Sil</Button>
            </Modal.Footer>
        </Modal>
    );
}

function DeletePhotoModal(props) {

    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                <Modal.Title><span className="far fa-trash-alt text-danger mr-2"></span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Fotoğrafı silmek istediğinden emin misin ?</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>İptal</Button>
                <Button variant="danger" onClick={props.delete}>Sil</Button>
            </Modal.Footer>
        </Modal>
    );
}
function PhotoModal(props) {

    return (
        <Modal size="lg" backdropClassName="bg-dark"  {...props}>
                <img src={props.photoUrl} />
        </Modal>
    );
}
function PhotoCardLikes({ photoId, hideCardBody }) {

    const [likes, setLikes] = useState([])
    useEffect(() => {
        axios.get(getPhotoLikesUrl(photoId)).then(res => { setLikes(res.data); })

    }, [photoId]);
    return (
        <div>
            <Row>
                <Col>
                    <div className="overflow-auto" style={{ height: likes.length > 6 ? 300 : "auto", width: 470 }}>
                        <ListGroup >
                            {
                                likes.map(l => {
                                    return <ListGroup.Item key={l.id} >
                                        <Link to={"/profile/" + l.id}>{l.firstName + " " + l.lastName}</Link>
                                    </ListGroup.Item>
                                })
                            }
                        </ListGroup>
                    </div>
                </Col>
            </Row>
            {
                likes.length > 0 ? <Row>
                    <Col>
                        <button onClick={hideCardBody} className="btn btn-link" style={{ padding: 0 }}>Gizle</button>
                    </Col>
                </Row> : null
            }
        </div>
    )
}