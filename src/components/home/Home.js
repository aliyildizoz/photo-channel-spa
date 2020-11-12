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
