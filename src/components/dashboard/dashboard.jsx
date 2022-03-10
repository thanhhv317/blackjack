import React, { Component } from 'react'
import { Body } from '../body/body'
import { Header } from '../header/header'
import { Play } from '../play/play'
import { Match } from '../matchs/match'

import { io } from "socket.io-client";

const token = localStorage.getItem('token');
let socket;
export class Dashboard extends React.Component {

    state = {
        rooms: [],
    }

    componentDidMount() {
        socket = io("http://localhost:3333",
            {
                withCredentials: true,
                extraHeaders: {
                    "x-access-token": token
                }
            }
        );
        socket.on("connect", () => {
            // todo sth

        });

        socket.on('list_rooms', (rooms) => {
            console.log(rooms)
            this.setState({
                rooms
            })
        })

        socket.on('new_user_join', (args) => {
            console.log(args);
        })

        socket.on("disconnect", () => {
            console.log("client 1 disconnected");
            // const leaveRoomUrl = `http://localhost:3333/rooms/leave/${room}`
            // axios({
            //     method: 'post',
            //     url: leaveRoomUrl,
            //     data: {
            //         username,
            //         password
            //     }
            // }).then((room) => {
            //     console.log(room);
            // }).catch(err => {
            //     console.log(err);
            // })
            // call API remove user out of the room, out of the match

        });
    }

    render() {
        const { logOut, room, setRoom, changeHeaderButtonName, headerButtonName, userInfo } = this.props;
        const { rooms, } = this.state;
        if (!!room) {
            return (
                <div>
                    <Header socket={socket} logOut={logOut} room={room} setRoom={setRoom} changeHeaderButtonName={changeHeaderButtonName} headerButtonName={headerButtonName}></Header>
                    {/* <Play socket={socket} userInfo={userInfo} room={room}  ></Play> */}
                    <Match socket={socket} userInfo={userInfo} room={room}></Match>
                </div>
            )
        } else {
            return (
                <div>
                    <Header socket={socket} logOut={logOut} room={room} setRoom={setRoom} changeHeaderButtonName={changeHeaderButtonName} headerButtonName={headerButtonName}></Header>
                    <Body socket={socket} rooms={rooms} setRoom={setRoom} changeHeaderButtonName={changeHeaderButtonName} ></Body>
                </div>
            )
        }

    }
}