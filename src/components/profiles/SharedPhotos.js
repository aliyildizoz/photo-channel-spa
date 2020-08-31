import React, { Component } from 'react'
import { Row,  Col } from 'react-bootstrap'
import PhotoCard from '../photoCard/PhotoCard'
import { connect } from 'react-redux'
class SharedPhotos extends Component {


    render() {
        return (
            <div>
                <Row >
                    <Col md={12} className="mt-5">
                        {
                            this.props.sharedPhotos.map(p => {
                                return <PhotoCard noUserName width="40rem" key={p.photo.id} photoInfo={p} />
                            })
                        }
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