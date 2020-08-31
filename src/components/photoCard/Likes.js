import React, { Component } from 'react'
import { ListGroup, Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class Likes extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col>
                        {/*yükseklik gelen veri sayısına göre ayarlanmalı  */}
                        <div className="overflow-auto" style={{ height: 200, width: this.props.width }}>
                            <ListGroup >
                                {
                                    this.props.likes.map(l => {
                                        return <ListGroup.Item key={l.userId} >
                                            <a href={"/profile/" + l.userId}>{l.firstName + " " + l.lastName}</a>
                                            <Link ></Link>
                                        </ListGroup.Item>
                                    })
                                }
                            </ListGroup>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button onClick={this.props.hideCardBody} className="btn btn-link" style={{ padding: 0 }}>Gizle</button>
                    </Col>
                </Row>

            </div>
        )
    }
}
