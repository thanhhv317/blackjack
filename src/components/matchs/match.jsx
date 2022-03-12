import React, { Component } from 'react';
import { BottomPlayer } from '../player/bottom-player/bottom-player';
import { TopPlayer } from '../player/top-player/top-player';
import { LeftPlayer } from '../player/left-player/left-player';
import './index.css'
import { RightPlayer } from '../player/right-player/right-player';

export class Match extends React.Component {

    initialState = {
        matchId: "",
        isRunning: false,
        users: [],
        me: {
            cards: []
        },
        isTurnDrawCards: false,
    }

    state = this.initialState;

    componentDidMount() {
        const { socket, room } = this.props;
        const userInfo = JSON.parse(this.props.userInfo);
        let userId = userInfo.id;
        this.setState({
            me: {
                ...userInfo,
                cards: [],
                is_done: false
            }
        })

        this.props.socket.emit("get_room", room, (response) => {
            if (!!response) {
                // console.log(response);
                let anotherUsers = response.current_user.filter(user => user !== userId).map(user => {
                    return {
                        id: user,
                        cards: [],
                        coin: 0,
                        username: "",
                        create_time: "",
                        update_time: "",
                        is_done: false
                    }
                }) || [];

                this.setState({
                    users: anotherUsers,
                });
            }
        })

        this.props.socket.on('start_game_send_info_to_everybody', response => {
            console.log("a co su kien roi", response);
        })
    }

    renderButtonPlayGame = () => {
        const { isRunning } = this.state;
        if (!isRunning) {
            return (
                <button className="btn btn-outline-success p-4 m-1" onClick={() => this.startGame()}>Choi</button>
            )
        }
        return
    }

    renderButtonDrawCards = () => {
        const { isTurnDrawCards } = this.state;
        if (isTurnDrawCards) {
            return (
                <button className="btn btn-outline-success p-4 m-1">Rut</button>
            )
        }
        return
    }


    startGame = () => {
        const { socket, room } = this.props;
        const { users, me } = this.state;
        const userInfo = JSON.parse(this.props.userInfo);
        let userId = userInfo.id;

        this.props.socket.emit("start_game", room, 1000, (response) => {
            if (!response.status) {
                console.log(response); // loi
            } else {
                console.log("bat dau choi", response);
                this.setState({
                    matchId: response.match.id
                })
                let usersMap = [];
                response.match.participant.forEach(participant => {
                    for (let i = 0; i < users.length; ++i) {
                        if (users[i].id === participant.user_id) {
                            usersMap.push({
                                ...users[i],
                                cards: participant.cards,
                                is_finish: participant.is_finish
                            });
                            break;
                        }
                    }
                })

                // add cards for me
                const cardsOfMe = response.match.participant.find(participant => {
                    return participant.user_id === userId;
                }).cards;

                this.setState({
                    users: usersMap,
                    isRunning: true,
                    me: {
                        ...me, cards: cardsOfMe
                    }
                })
            }
        })
    }

    renderTopPlayer = () => {
        // user[0]
        const { users } = this.state;
        const { socket } = this.props;
        if (!!users && users.length > 0) {
            return (
                <TopPlayer user={users[0]} socket={socket}></TopPlayer>
            )
        }
        return;
    }

    renderLeftPlayer = () => {
        const { users } = this.state;
        if (!!users && users.length > 1) {
            return (
                <LeftPlayer></LeftPlayer>
            )
        }
        return;
    }

    renderBottomPlayer = () => {
        const { userInfo } = this.props;
        const { me } = this.state;
        return (
            <BottomPlayer me={me} userInfo={userInfo}></BottomPlayer>
        )
    }

    render() {
        const { userInfo } = this.props;

        return (
            <div>
                {/* <TopPlayer></TopPlayer> */}
                {this.renderTopPlayer()}

                <div className="container">
                    <div className="row mt-2">
                        <div className="col-sm height-mid jack-mid jack-left">
                            {/* <LeftPlayer></LeftPlayer> */}
                            {this.renderLeftPlayer()}
                        </div>
                        <div className="col-sm">
                            <div className="row justify-content-md-center text-center">
                                {this.renderButtonPlayGame()}
                                {this.renderButtonDrawCards()}
                                <button className="btn btn-outline-danger p-4 m-1">Giang</button>

                            </div>

                        </div>

                        <div className="col-sm height-mid jack-mid jack-right">
                            {/* <RightPlayer></RightPlayer> */}

                        </div>
                    </div>
                </div>
                {this.renderBottomPlayer()}
            </div>
        )
    }
}