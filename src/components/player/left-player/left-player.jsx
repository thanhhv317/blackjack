import React, { Component } from 'react';

export class LeftPlayer extends React.Component {

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-7  rounded float-left">
                        <div className="row">
                            <div className="col">
                                <img src="./imgs/poker-symmetric-qr-Plain/2B.svg" alt="..." className="img-thumbnail mt-2 card__not-me " />
                                <img src="./imgs/poker-symmetric-qr-Plain/2B.svg" alt="..." className="img-thumbnail mt-2 card__not-me card-left card-2  " />
                            </div>

                        </div>
                        <div className="row">
                            <div className="col mt-1">
                                <button className="btn btn-sm btn-outline-info" disabled>
                                    minhlc - 30.000 coin
                                </button>

                                <input className='btn btn-danger  btn-sm' type="button" value="xét bài" />
                            </div>
                        </div>

                    </div>
                    <div className="col-5 mt-2">
                        {/* <div className="chat-container">
                            Hello everyone in here!!!
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}