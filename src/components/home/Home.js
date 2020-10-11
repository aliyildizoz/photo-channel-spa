import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CategoryList from '../categories/CategoryList';
import PhotoCardHook from '../photoCard/photoCardHook';
import { Most } from './homeHooks';
export default class Home extends Component {
    render() {
        return (
            <div>
                <Container >
                    <Row >

                        <Col md={3}>
                            <Container className="position-fixed mt-4">
                                <Row>
                                    <Col md="3"><CategoryList /></Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col md={6}>
                            <Container className="mt-5">
                                <Row>
                                    <Col className="ml-3">
                                        <PhotoCardHook
                                            key={1}
                                            photo={{
                                                publicId: "ushqxs3qmzsj2w552oxv",
                                                likeCount: 25,
                                                commentCount: 22,
                                                userId: 1,
                                                userName: "aliylzz",
                                                shareDate: "20.04.2020 15:36",
                                                photoId: 1,
                                                channelId: 1,
                                                channelName: "Araba",
                                                channelPublicId: "ushqxs3qmzsj2w552oxv"
                                            }}
                                            cardWidth="30rem"
                                            className=""
                                        />
                                        {/* <Link to={"/channel/1/settings"}>cas</Link>
                            <Link to={"/channel/3/settings"}>cas</Link> */}
                                        <PhotoCardHook
                                            key={2}
                                            photo={{
                                                publicId: "ushqxs3qmzsj2w552oxv",
                                                likeCount: 25,
                                                commentCount: 22,
                                                userId: 1,
                                                userName: "aliylzz",
                                                shareDate: "20.04.2020 15:36",
                                                photoId: 1,
                                                channelId: 3,
                                                channelName: "Fenerbahçe",
                                                channelPublicId: "ushqxs3qmzsj2w552oxv"
                                            }}
                                            cardWidth="30rem"
                                            className="mt-5"
                                        />
                                        <PhotoCardHook
                                            key={2}
                                            photo={{
                                                publicId: "ushqxs3qmzsj2w552oxv",
                                                likeCount: 25,
                                                commentCount: 22,
                                                userId: 1,
                                                userName: "aliylzz",
                                                shareDate: "20.04.2020 15:36",
                                                photoId: 1,
                                                channelId: 3,
                                                channelName: "Fenerbahçe",
                                                channelPublicId: "ushqxs3qmzsj2w552oxv"
                                            }}
                                            cardWidth="30rem"
                                            className="mt-5"
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </Col>

                        <Col md={3}>

                            <Container className="position-fixed mt-4">
                                <Row>
                                    <Col md="3"><Most /></Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
