import React, { Component } from 'react';
import { BottomPlayer } from '../player/bottom-player/bottom-player';
import { TopPlayer } from '../player/top-player/top-player';
import { LeftPlayer } from '../player/left-player/left-player';
import './index.css'
import { RightPlayer } from '../player/right-player/right-player';

export class Match extends React.Component {

    componentDidMount() {

    }

    render() {
        const {userInfo} = this.props;
        return (
            <div>
                {/* <TopPlayer></TopPlayer> */}

                <div className="container">
                    <div className="row mt-2">
                        <div className="col-sm height-mid jack-mid jack-left">
                            {/* <LeftPlayer></LeftPlayer> */}
                        </div>
                        <div className="col-sm">
                            <div className="row justify-content-md-center text-center">
                                <button className="btn btn-outline-success p-4 m-1">Choi</button>
                                <button className="btn btn-outline-success p-4 m-1">Rut</button>
                                <button className="btn btn-outline-danger p-4 m-1">Giang</button>

                            </div>

                        </div>

                        <div className="col-sm height-mid jack-mid jack-right">
                            {/* <RightPlayer></RightPlayer> */}

                        </div>
                    </div>
                </div>
                <BottomPlayer userInfo={userInfo}></BottomPlayer>
            </div>
        )
    }
}