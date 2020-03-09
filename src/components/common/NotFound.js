import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <div className="d-flex  align-items-center" style={{ height: "30vh", marginLeft: 200 }} >
                    <h1 className="mr-3 pr-3 align-top border-right inline-block align-content-center">404</h1>
                    <div className="inline-block align-middle">
                        <h2 className="font-weight-normal lead" id="desc">Aradığınız sayfa bulunmamaktadır.</h2>
                        <h6 className="font-weight-normal">Ana sayfaya gitmek için <Link to="/">tıklayınız.</Link> </h6>
                    </div>

                </div>
            </div>
        )
    }
}
