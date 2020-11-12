import Image from "cloudinary-react/lib/components/Image";
import Transformation from "cloudinary-react/lib/components/Transformation";
import React, { useState, useEffect } from "react"
import { Card, Col, Container, ListGroup, ListGroupItem, Media, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


export function Most(props) {


    return <Row>
        <Col>
            <Row>

                <Col>

                    <ListGroup variant="flush" className="shadow-lg ">
                        <ListGroup.Item variant="info"><h4>En iyi kanallar <i className="fas fa-star text-info"></i></h4></ListGroup.Item>
                        <ListGroup.Item className="d-flex">

                            <Image cloudName="dwebpzxqn" publicId={"ushqxs3qmzsj2w552oxv"}   >
                                <Transformation width={40} height={40} gravity="auto" crop="fill" radius="10" />
                            </Image>
                            <h6 className="d-flex align-items-center ml-1">Mersedes  arabaları</h6>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex">

                            <Image cloudName="dwebpzxqn" publicId={"ushqxs3qmzsj2w552oxv"}  >
                                <Transformation width={40} height={40} gravity="auto" crop="fill" radius="10" />
                            </Image>
                            <h6 className="d-flex align-items-center ml-1">Mersedes  arabaları</h6>

                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex">

                            <Image cloudName="dwebpzxqn" publicId={"ushqxs3qmzsj2w552oxv"}  >
                                <Transformation width={40} height={40} gravity="auto" crop="fill" radius="10" />
                            </Image>
                            <h6 className="d-flex align-items-center ml-1">Mersedes  arabaları</h6>

                        </ListGroup.Item>
                    </ListGroup>


                </Col>
            </Row>

            <Row className="mt-5 ">
                <Col>
                   <ListGroup className="shadow-lg ">
                       <ListGroupItem variant="info"><h4>Fotoğraf <i className="fas fa-star text-info"></i></h4></ListGroupItem>
                       <ListGroupItem><Link className="text-decoration-none"><i className="fas fa-thumbs-up mr-2"></i>En çok beğenilenler</Link></ListGroupItem>
                       <ListGroupItem><Link className="text-decoration-none"><i className="fas fa-comment mr-2"></i>En çok yorum alanlar</Link></ListGroupItem>
                   </ListGroup>
                </Col>
            </Row>
        </Col>
    </Row>
}