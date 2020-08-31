import React, { Component } from 'react'
import { ListGroup, Row, Col, Media } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { connect } from 'react-redux'
import Image from 'cloudinary-react/lib/components/Image/Image'
import Transformation from 'cloudinary-react/lib/components/Transformation/Transformation'

class UserChannels extends Component {

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <div className="overflow-auto" style={{ height: 250, width: this.props.width }}>
                            <ListGroup>
                                <ListGroup.Item style={{ borderRadius: 0, borderTop: 0, paddingBottom: 0 }}>
                                    <h5>Kanallar</h5>
                                </ListGroup.Item>
                                {
                                    this.props.userChannels.length > 6 ? this.props.userChannels.map(channel => {
                                        return <ListGroup.Item key={channel.id} ><Media>
                                            <Link to={"/channel/" + channel.id} className="text-decoration-none">
                                                <Image cloudName="dwebpzxqn" publicId={channel.publicId} className="mr-2"  >
                                                    <Transformation width={40} height={40} gravity="auto" crop="fill" radius="10" />
                                                </Image>

                                                {channel.name}
                                            </Link>

                                        </Media></ListGroup.Item>
                                    }) : this.props.userChannels.slice(0, 5).map(channel => {
                                        return <ListGroup.Item key={channel.id} ><Media>
                                            <Link to={"/channel/" + channel.id} className="text-decoration-none">
                                                <Image cloudName="dwebpzxqn" publicId={channel.publicId} className="mr-2"  >
                                                    <Transformation width={40} height={40} gravity="auto" crop="fill" radius="10" />
                                                </Image>

                                                {channel.name}
                                            </Link>

                                        </Media></ListGroup.Item>
                                    })

                                }
                                {this.props.userChannels.length > 6 ? <ListGroup.Item><Link to="/">Daha fazla...</Link></ListGroup.Item> : null}
                            </ListGroup>

                        </div>
                    </Col>
                </Row>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        userChannels: state.userReducer.channels
    }
}
export default connect(mapStateToProps, null)(UserChannels);