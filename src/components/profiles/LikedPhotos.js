import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
class LikedPhotos extends Component {
    render() {
        return (
            <div>
                <Row >
                    <Col md={12}>
                       
                    </Col>

                </Row>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        likedPhotos: state.userReducer.likedPhotos
    }
}
export default connect(mapStateToProps, null)(LikedPhotos);