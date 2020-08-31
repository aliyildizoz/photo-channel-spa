import React, { Component } from 'react'
import { Container, Row, Col, Table, Media, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import Image from 'cloudinary-react/lib/components/Image/Image'
import Transformation from 'cloudinary-react/lib/components/Transformation/Transformation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userAsyncActions from '../../redux/actions/user/userAsyncActions'
class Subscriptions extends Component {
    componentDidMount = () => {
        if (Object.keys(this.props.subscriptions).length === 0) {
            this.props.actions.getSubscriptions(this.props.match.params.id, this.props.history);
        }
    }
    render() {
        return (
            <div>
                <Container>
                    <Row className="mt-3">
                        <Col md={{ span: 6, offset: 3 }}>
                            <h4 className="text-danger">Abonelikler <Badge variant="danger">{this.props.subscriptions.length}</Badge></h4>
                            <hr />
                            <Table striped hover>
                                <tbody>
                                    {
                                        this.props.subscriptions.map(channel => {
                                            return <tr key={channel.id}>
                                                <td style={{ width: 3 }}>
                                                    <Media>
                                                        <Link to={"/channel/" + channel.id} className="text-decoration-none " >
                                                            <Image cloudName="dwebpzxqn" publicId={channel.publicId} className="mr-2"  >
                                                                <Transformation width={40} height={40} gravity="auto" crop="fill" radius="10" />
                                                            </Image>
                                                        </Link>

                                                    </Media>
                                                </td>
                                                <td className="align-middle">
                                                    <Link to={"/channel/" + channel.id} className="text-decoration-none">
                                                        {channel.name}
                                                    </Link>
                                                </td>
                                            </tr>
                                        })
                                    }

                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        subscriptions: state.userReducer.subscriptions
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getSubscriptions: bindActionCreators(userAsyncActions.getSubscriptionsApi, dispatch)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);