import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as channelActions from "../../redux/actions/channelActions"
import { bindActionCreators } from 'redux';
import PhotoCard from '../photoCard/PhotoCard';
class ChannelPhotos extends Component {


    componentDidMount = () => {
        //this.props.actions.getChannelPhotos(1)
    }
    render() {
        return (
            <div>
                <PhotoCard noHeader width="40rem" publicId="flh9d8nejqwhfolwsugf"></PhotoCard>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        channelPhotos: state.channelPhotos
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getChannelPhotos: bindActionCreators(channelActions.getChannelPhotosApi, dispatch)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChannelPhotos);