import { Transformation } from 'cloudinary-react';
import Image from 'cloudinary-react/lib/components/Image';
import React, { Component, useEffect, useState } from 'react'
import { Container, Col, Row, ListGroup, ListGroupItem, Alert, Badge } from 'react-bootstrap';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getFeedApi, getMostChannelsApi, getMostCommentsApi, getMostPhotosApi } from '../../redux/actions/home/homeAsyncActions';
import { searchByMultiCategoryApi } from '../../redux/actions/search/searchAsyncActions';
import CategoryList from '../categories/CategoryList';
import { MapPhotoCard } from '../photoCard/photoCardHook';

const feedType = {
    MostPhotos: "MostPhotos",
    MostComments: "MostComments",
    Feed: "Feed",
    FilterChannel: "FilterChannel"
}

class Home extends Component {
    state = {
        feedState: feedType.Feed
    }
    componentDidMount() {

        if (this.props.match.params.text) {
            this.setState({ ...this.state, feedState: feedType.FilterChannel })
        }
        this.props.actions.getFeed();
        this.props.actions.getMostChannels();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.text !== prevProps.match.params.text && this.props.match.params.text) {
            this.props.actions.getByQueryChannels(this.props.selectedCategories.map(c => c.id))
            this.setState({ ...this.state, feedState: feedType.FilterChannel })
        }

    }
    render() {
        return (
            <div>
                <Container >
                    <Row >

                        <Col md={3}>
                            <Container className="position-fixed mt-4">
                                <Row>
                                    <Col md="3"><CategoryList setFeedState={() => this.setState({ ...this.state, feedState: feedType.Feed })} /></Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col md={6}>
                            <Container className="mt-5">
                                <Row>
                                    <Col className="ml-3 mb-3">
                                        <Feed feedState={this.state.feedState} />
                                    </Col>
                                </Row>
                            </Container>
                        </Col>

                        <Col md={3}>

                            <Container className="position-fixed mt-4">
                                <Row>
                                    <Col md="3"><Row>
                                        <Col>
                                            <ListGroup variant="flush" className="shadow-lg ">
                                                <ListGroup.Item variant="info"><h4>En iyi kanallar <i className="fas fa-star text-info"></i></h4></ListGroup.Item>

                                                {
                                                    this.props.mostChannels.map((c, i) => {
                                                        return <ListGroup.Item key={i} className="d-flex">

                                                            <Image cloudName="dwebpzxqn" publicId={c.publicId}   >
                                                                <Transformation width={40} height={40} gravity="auto" crop="fill" radius="10" />
                                                            </Image>
                                                            <h6 className="d-flex align-items-center ml-1"> <Link className="text-decoration-none" to={"/channel/" + c.id}>{c.name}</Link></h6>

                                                        </ListGroup.Item>
                                                    })
                                                }

                                            </ListGroup>


                                        </Col>
                                    </Row>

                                        <Row className="mt-5 ">
                                            <Col>
                                                <ListGroup className="shadow-lg ">
                                                    <ListGroupItem variant="info"><h4>Fotoğraf <i className="fas fa-star text-info"></i></h4></ListGroupItem>
                                                    <ListGroupItem>
                                                        <Link className="text-decoration-none" onClick={() =>
                                                            this.props.actions.getMostPhotos(this.props.history, () => this.setState({ ...this.state, feedState: feedType.MostPhotos }))}>
                                                            <i className="fas fa-thumbs-up mr-2"></i>En çok beğenilenler
                                                        </Link>
                                                    </ListGroupItem>
                                                    <ListGroupItem>
                                                        <Link className="text-decoration-none" onClick={() => this.props.actions.getMostComments(this.props.history, () => this.setState({ ...this.state, feedState: feedType.MostComments }))}>
                                                            <i className="fas fa-comment mr-2"></i>En çok yorum alanlar
                                                        </Link>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </Col>
                                        </Row></Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

function Feed({ feedState }) {

    const homeState = useSelector(state => state.homeReducer)
    const isLogged = useSelector(state => state.isLoggedReducer)
    const [state, setState] = useState(feedState)
    useEffect(() => {
        if (isLogged) {
            setState(feedState);
        } else {
            if (feedState !== feedType.Feed) {
                setState(feedState);
            } else {
                setState(feedType.MostPhotos);
            }
        }
    }, [feedState, isLogged])
    switch (state) {
        case feedType.Feed:
            return <MapPhotoCard cardWidth="31em" photos={homeState.feed} notFoundText={"Lütfen bazı kanallara abone olun."} />
        case feedType.FilterChannel:
            return <FilterChannel />
        case feedType.MostPhotos:
            return <MapPhotoCard cardWidth="31em" notFoundText={"Lütfen bazı kanallara abone olun."} photos={homeState.mostPhotos} />
        case feedType.MostComments:
            return <MapPhotoCard bodyShowIndex={1} cardWidth="31em" notFoundText={"Lütfen bazı kanallara abone olun."} photos={homeState.mostComments} />
        default:
            break;
    }

}
function mapStateToProps(state) {
    return {
        mostChannels: state.homeReducer.mostChannels,
        isLogged: state.isLoggedReducer,
        selectedCategories: state.selectedCategoriesReducer
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getFeed: bindActionCreators(getFeedApi, dispatch),
            getMostChannels: bindActionCreators(getMostChannelsApi, dispatch),
            getMostPhotos: bindActionCreators(getMostPhotosApi, dispatch),
            getMostComments: bindActionCreators(getMostCommentsApi, dispatch),
            getByQueryChannels: bindActionCreators(searchByMultiCategoryApi, dispatch)

        }
    }
}
function FilterChannel() {
    const foundChannels = useSelector(state => state.searchReducer.searchCategory);
    return foundChannels.length !== 0 ? foundChannels.map((c, i) => <Alert key={i} variant="secondary">
        <Alert.Heading>
            <Image cloudName="dwebpzxqn" publicId={c.publicId}   >
                <Transformation width={50} height={50} gravity="auto" crop="fill" radius="5" />
            </Image>
            <Link className="text-decoration-none ml-2" to={"/channel/" + c.id}>{c.name}</Link></Alert.Heading>
        <hr />

        <span className="d-inline-flex mb-0">
            <b>Abone sayısı: </b> <Badge className="ml-2 pb-0 pt-1" variant="primary">{c.subscribersCount}</Badge>
        </span>
        <Link to={"/profile/" + c.ownerId} className="d-inline-flex text-dark  float-right">{c.firstName + " " + c.lastName}</Link>
    </Alert>) : <Alert variant="dark">
            <h6>Aradığınız kategoride kanal bulunamadı.</h6>
        </Alert>
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);