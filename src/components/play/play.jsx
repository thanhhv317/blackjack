import React, { Component } from 'react'
import { Match } from '../matchs/match';

export class Play extends React.Component {

    socket;
    roomId;
    userInfo;
    constructor(props) {
        super(props)
        this.socket = props.socket;
        this.roomId = props.room;
        this.userInfo = props.userInfo;

        // props.socket.on("get_room", (response) => {
        //     console.log(response); 
        // })
    }

    state = {
        matchId : ''
    }

    startGame = () => {
        const { socket, room } = this.props;

        this.props.socket.emit("start_game", room, 1000, (response) => {
            if (!response.status) {
                console.log(response);
            } else {
                console.log("bat dau choi", response);
                this.setState({
                    matchId: response.match.id
                })
            }
        })
    }

    drawCards = () => {
        const { matchId} = this.state;
        const { socket, room } = this.props;

        this.props.socket.emit("draw_cards", matchId, (response) => {
            console.log("rut bai", response);
        })
    }

    getUserDrawCards = () => {
        const { matchId} = this.state;

        this.props.socket.emit("next_user_draw_cards", matchId, (response) => {
           console.log("user rut tiep theo la: ",response)
        })
    }

    showCardOneUser = (userId) => {
        const { matchId} = this.state;

        this.props.socket.emit("show_card_one_user", matchId, userId, (response) => {
           console.log("diem so cua user la ",response)
        })

    }

    finishMatch = () => {
        const {room} = this.props;
        const { matchId} = this.state;
        console.log(room, matchId)
        this.props.socket.emit("finish_match", matchId, room, (response) => {
           console.log("ket thuc van bai",response)
        })

    }

    componentDidMount() {
        const { socket, room } = this.props;
        // this.socket = socket; 

        this.props.socket.emit("get_room", room, (response) => {
            console.log(response);
        })


    }

    render() {

        let {userInfo} = this.props;
        userInfo=JSON.parse(userInfo);

        return (
            <div className='container'>
                <input type="button" className="btn btn-outline-success" value="start game" onClick={() => this.startGame()} />
                <input type="button" className="btn btn-outline-primary" value="Rut them" onClick={() => this.drawCards()} />
                <input type="button" className="btn btn-outline-danger" value="Xong nguoi tiep theo" onClick={() => this.getUserDrawCards()} />
                <input type="button" className="btn btn-danger" value="Xet bai cua 1 em" onClick={() => this.showCardOneUser(userInfo.id)} />
                <input type="button" className="btn btn-danger" value="xet het" onClick={() => this.finishMatch()} />
                
                <h3>{userInfo.id}</h3>
                <h3>{userInfo.username}</h3>
                <h3>{userInfo.coin}</h3>
                
                <Match></Match>
            </div>
        )
    }
}