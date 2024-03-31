import React, { Component } from 'react'
import {Carousel, } from "react-responsive-carousel";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import withRouter from '../../redux/helpers/withRouter';

class PhotoGallery extends Component {
    state = {
        currentImage: 0,
        viewerIsOpen: false
    }
    setCurrentImage = (i) => {

        this.setState({ currentImage: i })
    }
    setViewerIsOpen = (isOpen) => {
        this.setState({ viewerIsOpen: isOpen })
    }
    closeLightbox = () => {
        this.setCurrentImage(0);
        this.setViewerIsOpen(false);
    };
    openLightbox = (i) => {
        this.setCurrentImage(i);
        this.setViewerIsOpen(true);
    };
    render() {
        return (
            <div className="mt-3">
              <Carousel showArrows={true} >
                            {this.props.photoGallery.map((x, i) => (
                                <div key={i}>
                                    <img src={x.src} srcSet={x.srcSet} alt={x.alt}  />
                                    <div>
                                        <h1><Link className="text-decoration-none text-warning" to={"/profile/" + x.userid}>{x.username}</Link></h1>
                                        <h6>
                                            <i className="fa fa-thumbs-up text-primary ml-2 mr-1"></i>
                                            {x.likecount}
                                            <b className="ml-2">·</b><span className="ml-2 font-weight-normal">{x.sharedate.split("T")[0]}</span>
                                        </h6>
                                    </div>
                                </div>
                            ))}
                </Carousel>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        photoGallery: state.channelReducer.photoGallery
    }
}
export default withRouter(connect(mapStateToProps, null)(PhotoGallery));
