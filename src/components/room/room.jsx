import React, { Component } from 'react'

export class Room extends React.Component {

    socket;

    componentDidMount() {
        this.socket = this.props.socket;
    }

    joinToRoom = (roomId) => {
        const { setRoom, changeHeaderButtonName } = this.props;

        this.socket.emit('join_to_room', roomId, (response) => {
            console.log(response);
        })
        
        setRoom(roomId);
        changeHeaderButtonName('Leave');
    }

    render() {

        const { room, roomName } = this.props;

        return (
            <div className="col-sm-4 col-md-4 col-4 col-lg-3">
                <div className="card border-success mb-3 card-custom">
                    <div className="card-header bg-transparent border-success">Room {roomName + 1}</div>
                    <div className="card-body text-success">
                        <h5 className="card-title">tai to</h5>
                        <button className="btn btn-small btn-outline-secondary" disabled>{room.current_number_user} / {room.max_user} user</button>
                        <button className="btn btn-small btn-success" onClick={() => this.joinToRoom(room.id)}>Join</button>
                    </div>
                </div>
            </div>
        )
    }
}