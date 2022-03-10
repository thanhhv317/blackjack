import React, { Component } from 'react';

export class TopPlayer extends React.Component {

    render() {
        return (
            <div>
                <div className="container">
                    <div className="text-center">
                        <button className="btn btn-outline-info  btn-sm" disabled>sonlh - 120.000 coin</button>
                        <input className='btn btn-danger  btn-sm' type="button" value="xét bài"/>
                    </div>
                    <div className="row justify-content-md-center text-center">
                        <div className="col-sm height-top jack-top rounded mx-auto d-block">
                            <img src="./imgs/poker-symmetric-qr-Plain/2B.svg" alt="..." className="img-thumbnail card__not-me mt-2" />
                            <img src="./imgs/poker-symmetric-qr-Plain/2B.svg" alt="..." className="img-thumbnail card__not-me mt-2" />
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
            </div>
        )
    }
}