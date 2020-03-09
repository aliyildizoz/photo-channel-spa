import React, { Component } from 'react'
import { Row, Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Media } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
export default class LikedPhotos extends Component {
    render() {
        return (
            <div>
                <h1>Beğenilen fotoğraflar</h1>
                <Row >
                    <Col md={12}>
                        <Card border="light" style={{ width: '40rem', height: "auto" }}>
                            <Card.Header>
                                <Media>
                                    <img
                                        width={25}
                                        height={25}
                                        className="mr-3"
                                        src="https://images.all-free-download.com/images/graphicthumb/colombia_91424.jpg"
                                        alt="Kanal Adı"
                                    />
                                    <Link to="/">
                                        Kanal Adı
                                    </Link>
                                </Media>
                            </Card.Header>

                            <Card.Body style={{ padding: 2, paddingTop: 0 }}>
                                <Card.Img variant="top" src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg" />
                            </Card.Body>
                            <Card.Footer>
                                <FontAwesome
                                    className="comment-dots"
                                    name="rocket"
                                    size="2x"
                                    spin
                                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                />
                            </Card.Footer>
                        </Card>
                    </Col>

                </Row>
            </div>
        )
    }
}
