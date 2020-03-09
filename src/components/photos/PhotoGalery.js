import React, { Component } from 'react'
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
export default class PhotoGalery extends Component {

    state = {
        currentImage: 0,
        viewerIsOpen: false
    }
    photos = [
        {
            src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
            width: 3,
            height: 2
        },
        {
            src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
            width: 2,
            height: 2
        },
        {
            src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
            width: 2,
            height: 2
        },
        {
            src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
            width: 3,
            height: 4
        },
        {
            src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
            width: 3,
            height: 4
        },
        {
            src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
            width: 4,
            height: 3
        },
        {
            src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
            width: 3,
            height: 2
        },
        {
            src: "https://source.unsplash.com/PpOHJezOalU/800x599",
            width: 4,
            height: 3
        },
        {
            src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
            width: 4,
            height: 10
        }
    ];

    getProcessedPhotos = (photos) => {
        let returnPhotos = []
        photos.forEach(element => {
            let width = randomIntFromInterval(3, 4)
            let height = randomIntFromInterval(2, 3)
            returnPhotos.push({
                src: element.src,
                width: width,
                height: height
            })
        });
        return returnPhotos;
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
            <div>
                <Gallery photos={this.getProcessedPhotos(this.photos)} onClick={this.openLightbox} />
                <ModalGateway>
                    {this.state.viewerIsOpen ? (
                        <Modal onClose={this.closeLightbox}>
                            <Carousel
                                currentIndex={this.state.currentImage}
                                views={this.photos.map(x => ({
                                    ...x,
                                    srcset: x.srcSet,
                                    caption: x.title,
                                }))}
                            />
                        </Modal>
                    ) : null}
                </ModalGateway>
            </div>
        )
    }
}
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}