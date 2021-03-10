import { Transformation } from 'cloudinary-react';
import Image from 'cloudinary-react/lib/components/Image';
import React, { Component, useEffect, useState } from 'react'
import { Container, Col, Row, ListGroup, ListGroupItem, Alert, Badge } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getFeedApi, getMostChannelsApi } from '../../redux/actions/home/homeAsyncActions';
import { searchByMultiCategoryApi } from '../../redux/actions/search/searchAsyncActions';
import CategoryList from '../categories/CategoryList';
import { MapPhotoCard } from '../photoCard/photoCardHook';
import { homeContent, feedType } from '../../redux/constants/constants'
import { getFeedSuccess } from '../../redux/actions/home/homeActionCreators';
import * as categoryActionCreators from '../../redux/actions/category/categoryActionCreators'
import { Button } from 'bootstrap';

class Home extends Component {
    state = {
        homeContentState: homeContent.Feed,
        feedType: feedType.Feed
    }
    componentDidMount() {
        if (this.props.match.params.text) {
            this.setState({ ...this.state, homeContentState: homeContent.FilterChannel })
        }
        this.props.actions.getFeed(feedType.Feed);
        this.props.actions.getMostChannels();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.text !== prevProps.match.params.text) {
            if (this.props.match.params.text) {
                var selectedCategories = this.props.match.params.text.includes("-") ? decodeURIComponent(this.props.match.params.text).split("-") : this.props.match.params.text;
                var selectedCategoriesDetail = this.props.categories.filter(c => selectedCategories.includes(c.name.toLowerCase()));
                this.props.actions.setSelectedCategories([...selectedCategoriesDetail])
                this.props.actions.getByQueryChannels(selectedCategoriesDetail.map(c => c.id))
                this.setState({ ...this.state, homeContentState: homeContent.FilterChannel })
            } else {
                this.props.actions.setSelectedCategories([])
                this.setState({ ...this.state, homeContentState: homeContent.Feed })
            }
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
                                    <Col md="3"><CategoryList setFeedState={() => this.setState({ ...this.state, homeContentState: homeContent.FilterChannel })} /></Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col md={6}>
                            <Container className="mt-5">
                                <Row>
                                    <Col className="ml-3 mb-3">
                                        <Feed feedState={this.state.homeContentState} />
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
                                                    <ListGroupItem className="cursorPointer" active={this.state.feedType === feedType.MostPhotos} onClick={() =>
                                                        this.props.actions.getFeed(feedType.MostPhotos, () => this.setState({ ...this.state, homeContentState: homeContent.Feed, feedType: feedType.MostPhotos }))}>
                                                        <i className="fas fa-thumbs-up mr-2 text-info"></i>En çok beğenilenler
                                                    </ListGroupItem>
                                                    <ListGroupItem className="cursorPointer" active={this.state.feedType === feedType.MostComments} onClick={() => this.props.actions.getFeed(feedType.MostComments, () => this.setState({ ...this.state, homeContentState: homeContent.Feed, feedType: feedType.MostComments }))}>
                                                        <i className="fas fa-comment mr-2 text-info"></i>En çok yorum alanlar
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
    const dispatch = useDispatch()
    const [state, setState] = useState(feedState)
    useEffect(() => {
        setState(feedState);
    }, [feedState])
    switch (state) {
        case homeContent.Feed:
            return <MapPhotoCard refreshPhotos={(id) => {
                dispatch(getFeedSuccess([...homeState.feed.filter(p => p.photoId !== id)]))
            }} removeButton cardWidth="31em" photos={homeState.feed} notFoundText="Loading..." />
        case homeContent.FilterChannel:
            return <FilterChannel />
        default:
            return null;
    }

}
function mapStateToProps(state) {
    return {
        mostChannels: state.homeReducer.mostChannels,
        isLogged: state.isLoggedReducer,
        selectedCategories: state.selectedCategoriesReducer,
        categories: state.categoryListReducer
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getFeed: bindActionCreators(getFeedApi, dispatch),
            getByQueryChannels: bindActionCreators(searchByMultiCategoryApi, dispatch),
            getMostChannels: bindActionCreators(getMostChannelsApi, dispatch),
            setSelectedCategories: bindActionCreators(categoryActionCreators.setSelectedCategoriesSuccess, dispatch)
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