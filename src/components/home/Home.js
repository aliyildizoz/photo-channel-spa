import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import CategoryList from '../categories/CategoryList';
import PhotoCardHook from '../photoCard/photoCardHook';
export default class Home extends Component {
    render() {
        return (
            <div>
                <Container className="mt-4">
                    <Row >

                        <Col md={2}>
                            <CategoryList />
                        </Col>
                        <Col md={6}>
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
                            />

                        </Col>
                        <Col md={4}>

                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
