import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        return (
            <div className="container">

                <div className="jumbotron">
                    <h1 className="font-weight-bold  display-4">Hello, User!</h1>
                    <p className="lead">Welcome to <a className="navbar-brand text-success font-weight-bolder  h1" href="#">
                        <i className="fa fa-bookmark" />Insight &nbsp; &nbsp;</a>
                    </p>
                    <p classname="lead"> Enjoy our Community for free </p>
                    <hr className="my-4" />
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                </div>
            </div>
        )
    }
}
