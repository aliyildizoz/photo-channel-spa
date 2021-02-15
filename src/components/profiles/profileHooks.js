import Image from "cloudinary-react/lib/components/Image";
import Transformation from "cloudinary-react/lib/components/Transformation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Badge, Button, Col, ListGroup, Media, Row, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getUserPhotosApi } from "../../redux/actions/photo/photoAsyncActions";
import PhotoCardHook, { MapPhotoCard } from "../photoCard/photoCardHook";
import { getSubscriptionsApi, getLikedPhotosApi, getUserCommentsPhotosApi, getUserApi } from "../../redux/actions/user/userAsyncActions";
import { getIsOwnerSuccess } from "../../redux/actions/user/userActionsCreators";
import { SubsApi } from "../channel/channelHooks";
import Loading from "../common/Loading";

export function Flow({ renderState, userId }) {
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
                    <Tab eventKey="photos" title="Fotoğraflar" >
                        <Col >
                            <UserPhotos userId={userId} />
                        </Col>
                    </Tab>
                    <Tab eventKey="likes" title="Beğeniler">
                        <Col>
                            <LikedPhotos userId={userId} />
                        </Col>
                    </Tab>
                    <Tab eventKey="comments" title="Yorumlar">
                        <Col>
                            <CommentsPhotos userId={userId} />
                        </Col>
                    </Tab>
                </Tabs>
            </Col>
        </Row>
    </div>
}
function LikedPhotos({ userId }) {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true)
    const setFalseIsLoading = () => setIsLoading(false);
    const likedPhotos = useSelector(state => state.userReducer.likedPhotos)
    useEffect(() => {
        dispatch(getLikedPhotosApi(userId, setFalseIsLoading))
    }, [userId, dispatch]);
    return <div className="mt-3">
        {isLoading ? < Loading /> : <MapPhotoCard photos={likedPhotos} />}
    </div>
}
function CommentsPhotos({ userId }) {

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true)
    const setFalseIsLoading = () => setIsLoading(false);
    useEffect(() => { dispatch(getUserCommentsPhotosApi(userId, setFalseIsLoading)) }, [userId, dispatch])
    const commentsPhotos = useSelector(state => state.userReducer.commentsPhotos)

    return <div className="mt-3"> {isLoading ? <Loading /> : <MapPhotoCard photos={commentsPhotos} bodyShowIndex={1} notFoundText={"Bu kişinin herhangi bir yorumu bulunmamaktadır."} />}</div>
}

function UserPhotos({ userId }) {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true)
    const setFalseIsLoading = () => setIsLoading(false);
    useEffect(() => { dispatch(getUserPhotosApi(userId, setFalseIsLoading)); }, [userId, dispatch])

    const userPhotos = useSelector(state => state.userReducer.userPhotos)

    return <div className="mt-3">{isLoading ? <Loading /> : <div> <MapPhotoCard photos={userPhotos} /></div>}
    </div>
}

export function Subscriptions({ userId, subsCount }) {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const setFalseIsLoading = () => setIsLoading(false);

    useEffect(() => {
        dispatch(getSubscriptionsApi(userId, setFalseIsLoading));
    }, [userId, dispatch])
    const subscriptions = useSelector(state => state.userReducer.subscriptions)
    return <div>
        <Row>
            <Col>

                <ListGroup>
                    <ListGroup.Item style={{ borderRadius: 0, borderTop: 0, borderBottom: 0, paddingBottom: 0 }}>
                        <h5>Abonelikler</h5>
                    </ListGroup.Item>
                    {isLoading ? <Loading /> : <div className="overflow-auto" style={{ height: 600 }}> {
                        subsCount > 0 ? subscriptions.map(channel => {
                            return <ListGroup.Item key={channel.id} >
                                <Media>
                                    <Image cloudName="dwebpzxqn" publicId={channel.publicId} className="mr-2"  >
                                        <Transformation width={40} height={40} gravity="auto" crop="fill" radius="10" />
                                    </Image>
                                    <Link to={"/channel/" + channel.id} className="text-decoration-none mt-1">
                                        {channel.name}
                                    </Link>
                                    <SubsButton channelId={channel.id} /></Media>
                            </ListGroup.Item>
                        }) : <h6 className="font-weight-normal mt-2 ml-2"><i> Abonelik bulunmamaktadır.</i></h6>
                    }
                    </div>}
                </ListGroup>
            </Col>
        </Row>

    </div>
}

function SubsButton({ channelId }) {
    const [isSubs, setIsSubs] = useState(true)
    const dispatch = useDispatch()
    const subsThen = () => setIsSubs(true)
    const unSubsThen = () => setIsSubs(false)
    const [subs, unSubs] = SubsApi(channelId, subsThen, unSubsThen, dispatch);
    const isOwner = useSelector(state => state.userReducer.isOwner)
    return isOwner ? isSubs ? <Button variant="primary" onClick={unSubs} className="btn-sm ml-2">Abone olundu</Button> :
        <Button variant="outline-primary" onClick={subs} className="btn-sm ml-2">Abone ol</Button> : null
}