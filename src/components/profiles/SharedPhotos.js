import React, { Component } from 'react'
import { Row, Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Media } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import PhotoCard from '../photoCard/PhotoCard'

export default class SharedPhotos extends Component {
    //Sorun çözüldü
    // static getDerivedStateFromProps(nextProps, nextState) {
    //    // console.log(nextProps)
    //   return null;
    // }

    render() {
        return (
            <div>
                <h1>Paylaşılan fotoğraflar</h1>
                <h2>{this.props.userId}</h2>
            </div>
        )
    }
}
