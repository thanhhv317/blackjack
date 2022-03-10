import React, { Component } from 'react'
import { Room } from '../room/room';
import './index.css';

export class Body extends React.Component {

    
    render() {
        const { rooms, socket, setRoom, changeHeaderButtonName } = this.props;

        return (
            <div className="container">
                <div className="row">
                    {rooms.map((room, index) =>
                        <Room socket={socket} roomName={index} room={room} key={index} setRoom={setRoom} changeHeaderButtonName={changeHeaderButtonName}></Room>
                    )}
                </div>
            </div>
        )
    }
} 