import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export default class Loading extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col className="mt-5">
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}
