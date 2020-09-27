import React, { Component } from 'react'
import { Row,  Col } from 'react-bootstrap'
import { connect } from 'react-redux'
class SharedPhotos extends Component {


    render() {
        return (
            <div>
                <Row >
                    <Col md={12} className="mt-5">
                       
                    </Col>

                </Row>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        sharedPhotos: state.userReducer.sharedPhotos
    }
}
export default connect(mapStateToProps, null)(SharedPhotos);