import React, { Component } from 'react'
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getPhotoGalleryPath } from '../../redux/actions/photo/photoEndPoints';
import { redirectErrPage } from '../../redux/helpers/historyHelper';
export class PhotoGalery extends Component {
    state = {
        currentImage: 0,
        viewerIsOpen: false,
        photos: []
    }
    componentDidMount() {
        axios.get(getPhotoGalleryPath(this.props.channelId)).then(res => {
            res.data.forEach(element => {
                let width = randomIntFromInterval(3, 4)
                let height = randomIntFromInterval(3, 4)
                this.setState({
                    photos: [...this.state.photos, {
                        userid: element.userId,
                        sharedate: element.shareDate,
                        likecount: element.likeCount,
                        username: element.userName,
                        src: element.photoUrl,
                        width: width,
                        height: height
                    }]
                })
            });
        }).catch(err => {
            console.log(err);
            redirectErrPage(this.props.history, err)
        })
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
                <Gallery photos={this.state.photos} onClick={this.openLightbox} />
                {
                    this.state.viewerIsOpen ? (<ModalGateway>

                        <Modal onClose={this.closeLightbox}>
                            <Carousel
                                currentIndex={this.state.currentImage}
                                views={this.state.photos.map((x, i) => ({
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
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
