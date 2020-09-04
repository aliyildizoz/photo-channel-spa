import React, { Component } from 'react'
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
    openLightbox = (event, photo) => {
        this.setCurrentImage(photo.index);
        this.setViewerIsOpen(true);
    };
    render() {
        return (
            <div className="mt-3">
                <Gallery photos={this.props.photoGallery} onClick={this.openLightbox} />
                {
                    this.state.viewerIsOpen ? (<ModalGateway>

                        <Modal onClose={this.closeLightbox}>
                            <Carousel
                                currentIndex={this.state.currentImage}
                                views={this.props.photoGallery.map((x, i) => ({
                                    ...x,
                                    srcset: x.srcSet,
                                    caption: <div key={i}>
                                        <h1><Link className="text-decoration-none text-warning" to={"/profile/" + x.userid}>{x.username}</Link></h1>
                                        <h6>
                                            <i className="fa  fa-thumbs-up text-primary ml-2 mr-1"></i>
                                            {x.likecount}
                                            <b className="ml-2">·</b><span className="ml-2 font-weight-normal">{x.sharedate.split("T")[0]}</span>
                                        </h6>
                                    </div>
                                }))}
                            />
                        </Modal>

                    </ModalGateway>) : null
                }
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        photoGallery: state.channelReducer.photoGallery
    }
}
export default connect(mapStateToProps, null)(PhotoGallery);
