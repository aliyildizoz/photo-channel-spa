import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import PhotoCard from '../photoCard/PhotoCard'
import { connect } from 'react-redux'
class LikedPhotos extends Component {
    render() {
        return (
            <div>
                <Row >
                    <Col md={12}>
                        {
                            this.props.likedPhotos.map(p => {
                                return <PhotoCard width="40rem" key={p.photo.id} photoInfo={p} />
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
        likedPhotos: state.userReducer.likedPhotos
    }
}
export default connect(mapStateToProps, null)(LikedPhotos);