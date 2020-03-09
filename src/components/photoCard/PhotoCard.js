import React, { Component } from 'react'
import { Container, Row, Col, Card, Media } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Comments from './Comments';
import Likes from './Likes';
import Image from 'cloudinary-react/lib/components/Image/Image';
import { Transformation } from 'cloudinary-react';
export default class PhotoCard extends Component {
    state = {
        isLike: false,
        isCardBodyShow: 0
    }
    setIsLike = () => {
        this.setState({ isLike: !this.state.isLike })
        this.setState({ isCardBodyShow: 2 })
    }
    setCommentShow = () => {
        this.setState({ isCardBodyShow: 1 })
    }
    setLikesShow = () => {
        this.setState({ isCardBodyShow: 2 })
    }
    hideCardBody = () => {
        this.setState({ isCardBodyShow: 0 })
    }
    render() {
        const LikeButton = ({ isLike }) => {
            if (isLike) {
                return <Button onClick={this.setIsLike} variant="primary" style={{ borderRadius: 0 }} className="btn-sm">
                    <i className="fa  fa-thumbs-up" style={{ fontSize: 16 }}></i>&nbsp;&nbsp;Beğen</Button>
            } else {
                return <Button onClick={this.setIsLike} variant="outline-primary" style={{ borderRadius: 0 }} className="btn-sm">
                    <i className="fa  fa-thumbs-up" style={{ fontSize: 16 }}></i>&nbsp;&nbsp;Beğen</Button>
            }
        }
        const CardBodyShow = ({ isCardBodyShow }) => {
            if (isCardBodyShow != 0) {
                console.log(isCardBodyShow)
                if (isCardBodyShow == 1) {
                    return (
                        <Card.Body>
                            <Comments hideCardBody={this.hideCardBody}></Comments>
                        </Card.Body>
                    )
                }
                else if (isCardBodyShow == 2) {
                    return (
                        <Card.Body>
                            <Likes hideCardBody={this.hideCardBody} width={this.props.width ? "800" : "470"}></Likes>
                        </Card.Body>
                    )
                }
                else {
                    return null;
                }
            }
            return null;
        }
        return (
            <div>
                <Container className="mb-5" >
                    <Row >
                        <Col>
                            {/* this.props.width ? this.props.width : '32rem' */}
                            <Card border="light" className="shadow-lg  bg-white rounded" style={{ width: this.props.width ? this.props.width : '32rem', height: "auto" }}>
                                {
                                    this.props.noHeader ? null : <Card.Header >
                                        <Media>
                                            <Link to={"/channel/" + this.props.channelId}>
                                                <img
                                                    width={25}
                                                    height={25}
                                                    className="mr-2"
                                                    src="https://images.all-free-download.com/images/graphicthumb/colombia_91424.jpg"
                                                    alt="Kanal Adı"
                                                />
                                            </Link>
                                            <Link to="/">
                                                Kanal Adı
                                        </Link>
                                        </Media>
                                    </Card.Header>
                                }
                                {/* rgjfrvw9645y6tcux2i1 flh9d8nejqwhfolwsugf */}
                                <Image cloudName="dwebpzxqn" publicId={this.props.publicId} className="card-img-top img-fluid">
                                    <Transformation crop="fill" />
                                </Image>
                                {/* <Card.Img src="https://www.gstatic.com/webp/gallery/1.jpg" /> */}
                                <Card.Footer style={{ paddingTop: 0 }} className="pl-2">
                                    <p style={{ fontSize: 16 }} className="text-muted d-inline-flex mb-0 mr-2">
                                        <button onClick={this.setLikesShow} style={{ padding: 0 }} type="button" className="btn btn-link">
                                            <i className="fa  fa-thumbs-up text-primary ml-2 mr-2"></i>23</button>
                                        <b className="ml-2 ">·</b>
                                    </p>
                                    <p style={{ fontSize: 16 }} className="text-muted d-inline-flex mb-0">
                                        <button onClick={this.setCommentShow} style={{ padding: 0 }} type="button" className="btn btn-link text-dark">2 Yorum</button>
                                    </p>
                                    {
                                        this.props.noUserName ? null : <p className="text-muted d-inline-flex mb-0">
                                            <b className="ml-2 ">·</b>
                                            <Link to={"/profile/" + this.props.userId} className="ml-2 ">aliylzz</Link>
                                        </p>
                                    }
                                    <hr style={{ margin: 5 }} />
                                    <LikeButton isLike={this.state.isLike}></LikeButton>
                                    <Button variant="dark" onClick={this.setCommentShow} className="btn-sm ml-2" style={{ borderRadius: 0 }}>
                                        <i className="fa  fa-comment" style={{ fontSize: 16 }}></i>&nbsp;&nbsp;Yorum Yap</Button>
                                    <div className="d-inline-flex float-right">01.02.2020</div>
                                </Card.Footer>
                                <CardBodyShow isCardBodyShow={this.state.isCardBodyShow}></CardBodyShow>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
