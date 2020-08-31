import React, { useState, useEffect } from "react"
import { Container, Row, Col, Card, Media, InputGroup, FormControl, ListGroup, Dropdown, Modal, Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import Image from 'cloudinary-react/lib/components/Image/Image';
import { Transformation } from 'cloudinary-react';
import { getPhotoCommentsUrl } from "../../redux/actions/comment/commentEndPoints"
import { getPhotoLikesUrl, getIsLikePath, deleteLikePath, LIKE_API_URL } from "../../redux/actions/like/likeEndPoints"
import { authHeaderObj } from "../../redux/helpers/localStorageHelper"
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";
import { redirectErrPage } from "../../redux/helpers/historyHelper";

export default function PhotoCardHook({ photo, width = "32rem" }) {

    const [cardBodyShow, setCardBodyShow] = useState(0);
    const [isOwner, setIsOwner] = useState(false);
    const currentUser = useSelector(state => state.currentUserReducer)
    useEffect(() => {
        setIsOwner(currentUser.id === photo.userId)
    }, [photo]);
    return (
        <Card border="light" className="shadow-lg  bg-white rounded mt-5" style={{ width: width, height: "auto" }}>

            <PhotoCardHeader isOwner={isOwner} channelId={photo.channelId} channelName={photo.channelName} channelPublicId={photo.channelPublicId} />

            <Image cloudName="dwebpzxqn" publicId={photo.publicId} className="card-img-top img-fluid">
                <Transformation crop="fill" />
            </Image>

            <PhotoCardBody
                shareDate={photo.shareDate}
                likeCount={photo.likeCount}
                commentCount={photo.commentCount}
                userName={photo.userName}
                userId={photo.userId}
                setCommentShow={() => setCardBodyShow(1)}
                setLikesShow={() => setCardBodyShow(2)}
                photoId={photo.photoId}
            />


            <PhotoCardFooter currentUserId={currentUser.id} likeCount={photo.likeCount} photoId={photo.photoId} cardBodyShow={cardBodyShow} hideCardBody={() => setCardBodyShow(0)} />

        </Card>
    )
}
function PhotoCardFooter({ currentUserId, likeCount, photoId, cardBodyShow, hideCardBody }) {
    switch (cardBodyShow) {
        case 1:
            return <Card.Footer><PhotoCardComments currentUserId={currentUserId} photoId={photoId} hideCardBody={hideCardBody} /> </Card.Footer >
        case 2:
            return likeCount > 0 ? <Card.Footer > <PhotoCardLikes photoId={photoId} hideCardBody={hideCardBody} /></Card.Footer > : null
        default:
            return null;
    }
}
function PhotoCardHeader({ isOwner, channelId, channelPublicId, channelName }) {
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const deletePhotoClick = () => {
        //to do : fotoğraf silme api çağrısı
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
                isOwner ? <Button variant="danger" onClick={() => setDeleteModalShow(true)} className="d-inline-flex float-right"><span className="far fa-trash-alt text-light"></span></Button> : null
            }
            <DeletePhotoModal
                show={deleteModalShow}
                onHide={() => setDeleteModalShow(false)}
                delete={deletePhotoClick}
            />
        </Card.Header>
    )
}

function PhotoCardBody({ photoId, likeCount, commentCount, userName, userId, shareDate, setLikesShow, setCommentShow }) {

    const [likeCnt, setlikeCnt] = useState(likeCount)
    const setlikeCount = (isLike) => {
        isLike ? setlikeCnt(likeCnt + 1) : setlikeCnt(likeCnt - 1);
    }

    return (
        <Card.Body style={{ paddingTop: 0 }} className="pl-2">
            <p style={{ fontSize: 16 }} className="text-muted d-inline-flex mb-0 mr-2">
                <button onClick={setLikesShow} style={{ padding: 0 }} type="button" className="btn btn-link">
                    <i className="fa  fa-thumbs-up text-primary ml-2 mr-2"></i>{likeCnt} </button>
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

            <LikeButton photoId={photoId} setlikeCount={setlikeCount} />
            <Button variant="dark" onClick={setCommentShow} className="btn-sm ml-2" style={{ borderRadius: 0 }}>
                <i className="fa  fa-comment" style={{ fontSize: 16 }}></i>&nbsp;&nbsp;Yorum Yap</Button>
            <div className="d-inline-flex float-right">{shareDate}</div>
        </Card.Body>
    )
}

function LikeButton({ photoId, setlikeCount }) {
    const [isLike, setIsLike] = useState(false)
    const history = useHistory()
    const isLogged = useSelector(state => state.isLoggedReducer);
    const onClick = () => {
        var fd = new FormData();
        fd.append("photoId", photoId)
        if (!isLike) {
            axios.post(LIKE_API_URL, fd, { headers: authHeaderObj() }).then(() => {
                setIsLike(!isLike);
                setlikeCount(!isLike);
            }).catch(err => redirectErrPage(history, err));
        }
        else {
            axios.delete(deleteLikePath(photoId), { headers: authHeaderObj() }).then(() => {
                setIsLike(!isLike);
                setlikeCount(!isLike);
            }).catch(err => redirectErrPage(history, err));
        }

    }

    useEffect(() => {
        if (isLogged) {
            axios.get(getIsLikePath(photoId), { headers: authHeaderObj() }).then(res => setIsLike(res.data))
        }
    }, [])
    if (!isLogged) {
        return <Button onClick={() => history.push("/login")} variant="outline-primary" style={{ borderRadius: 0 }} className="btn-sm">
            <i className="fa  fa-thumbs-up" style={{ fontSize: 16 }}></i>&nbsp;&nbsp;Beğen</Button>
    }
    return (
        <Button onClick={onClick} variant={isLike ? "primary" : "outline-primary"} style={{ borderRadius: 0 }} className="btn-sm">
            <i className="fa  fa-thumbs-up" style={{ fontSize: 16 }}></i>&nbsp;&nbsp;Beğen</Button>
    )
}

function PhotoCardComments({ currentUserId, photoId, hideCardBody }) {

    const [comments, setComments] = useState([]);
    const [editModalShow, setEditModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [currentComment, setCurrentComment] = useState({});
    useEffect(() => {

        axios.get(getPhotoCommentsUrl(photoId)).then(res => { setComments(res.data) })
    }, []);
    const isLogged = useSelector(state => state.isLoggedReducer);
    const history = useHistory()
    const createCommentClick = () => {
        if (!isLogged) history.push("/login")
        //to do: yorum yapmak için api isteği
    }

    const editCommentClick = () => {
        comments.forEach((c, i, arr) => {
            if (c.commentId === currentComment.commentId) {
                arr[i].description = currentComment.description;
            }
        })
        setComments([...comments])
        setEditModalShow(false)
        //todo : yorum düzeltmek için api isteği
    }
    const deleteCommentClick = (comment) => {
        //todo : yorum silmek için api isteği
        setComments([...comments.filter(c => c.commentId !== comment.commentId)])
        setDeleteModalShow(false)

    }
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <div>
            <svg onClick={onClick} ref={ref} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-three-dots-vertical dropdowncommentbutton" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
        </div>
    ));
    return (
        <div>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                            <Button variant="success" onClick={createCommentClick} style={{ borderRadius: 0 }}>Yorum yap</Button>
                        </InputGroup.Append>
                    </InputGroup>
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

                                <div className="d-inline-flex float-right">{c.shareDate}</div>

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

function PhotoCardLikes({ photoId, hideCardBody }) {

    const [likes, setLikes] = useState([])
    useEffect(() => {
        axios.get(getPhotoLikesUrl(photoId)).then(res => { setLikes(res.data); })

    }, []);
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