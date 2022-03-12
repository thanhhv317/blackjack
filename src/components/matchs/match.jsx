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
        isLoading: false,
        room: ""
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
            },
            room
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
                        is_done: false,
                        is_drawing: false
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
        // next_player
        this.props.socket.on('next_player', response => {
            console.log("oh co nguoi vua rut xong bai ne", response);
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
                <div>
                    <button className="btn btn-outline-success p-4 m-1" onClick={() => this.drawCards()}>Rut</button>
                    <button className="btn btn-outline-danger p-4 m-1" onClick={() => this.doneDrawCards()}>Giang</button>
                </div>
            )
        }
        return
    }
    

    renderIsLoading = () => {
        const {isLoading} = this.state;
        if (isLoading) {
            return (
                "vui long cho "
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

                // nguoi nao rut bai truoc day
                if (response.user_draw.user_id === userId) {
                    this.setState({
                        isTurnDrawCards: true
                    })
                }
            }
        })
    }


    drawCards = () => {
        const { matchId } = this.state;
        const userInfo = JSON.parse(this.props.userInfo);
        this.props.socket.emit("draw_cards", matchId, (response) => {
            console.log("rut bai", response);
            if (!!response) {
                let user = response.participant.find((participant) => {
                    return participant.user_id === userInfo.id
                });
                if (!!user.cards) {
                    this.setState({
                        me: {
                            me: this.state.me,
                            cards: user.cards,
                            is_finish: user.is_finish
                        }
                    })
                }
            }
        })
    }

    // toi da rut xong
    doneDrawCards = () => {
        const { matchId, users, room } = this.state;
        this.props.socket.emit("next_user_draw_cards", matchId, room, (response) => {
            console.log("user rut tiep theo la: ", response)
            if (!!response) {
                this.setState({
                    isTurnDrawCards: false,
                    isLoading: true
                })

                let tmpUsers = users.map((user) => {
                    if (user.id === response.user_id) {
                        return {
                            ...user,
                            is_drawing: true
                        }
                    }
                    else {
                        return user;
                    }
                })

                this.setState({
                    users: tmpUsers
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
                                {this.renderIsLoading()}
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