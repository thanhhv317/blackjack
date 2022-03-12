import React, { Component } from 'react';
import * as axios from 'axios';

export class TopPlayer extends React.Component {

    initialState = {
        // id: "",
        // username: "",
        // coin: 0,
        // create_time: "",
        // update_time: "",
        // cards: [],
        // is_done: false,
        // is_drawing: false
    }

    state = this.initialState;

    componentDidMount() {
        const { socket, user, is_drawing } = this.props;
        console.log("user", user);
        this.setState({
            ...user
        })
        const token = localStorage.getItem('token')

        const loginUrl = `http://localhost:3333/auth/${user.id}`

        axios({
            method: 'get',
            url: loginUrl,
            headers: {
                'x-access-token': token
            }
        }).then((aUser) => {
            console.log(aUser.data);
            this.setState({
                ...aUser.data,
                cards: user.cards
            })
        }).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);

            }

        })
    }

    renderStatusIsDrawing = () => {
        const { is_drawing } = this.props.user;
        if (!!is_drawing) {
            return "btn btn-danger btn-sm "
        }
        return "btn btn-outline-info btn-sm"
    }

    renderButtonDraw = () => {
        const { is_done } = this.state;
        if (!!is_done)
            return (
                <input className='btn btn-danger  btn-sm' type="button" value="xét bài" />
            )
        return;
    }

    render() {
        const { user } = this.props;
        const { id, username, coin } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="text-center">
                        <button className={this.renderStatusIsDrawing()} disabled>{username} - {coin} coin</button>
                        {this.renderButtonDraw()}
                    </div>
                    <div className="row justify-content-md-center text-center">
                        <div className="col-sm height-top jack-top rounded mx-auto d-block">

                            {user.cards.map((card, key) => {
                                return (
                                    <img key={key} src="./imgs/poker-symmetric-qr-Plain/2B.svg" alt="..." className="img-thumbnail card__not-me mt-2" />
                                )
                            })}
                        </div>
                    </div>
                    <div className="row box-chat__top">
                        <div className="col-3"></div>
                        <div className="col-6 text-center">
                            {/* <div className="chat-container">
                                Hello everyone in here!!!
                            </div> */}
                        </div>
                        <div className="col-3"></div>
                    </div>
                </div>
            </div >
        )
    }
}