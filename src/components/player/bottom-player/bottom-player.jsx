import React, { Component } from 'react';

export class BottomPlayer extends React.Component {


    render() {

        const {me} = this.props;

        return (
            <div>
                <div className="container box-chat__bottom mt-2">
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-6 text-center">
                            {/* <div className="chat-container">
                                Hello everyone in here!!!
                            </div> */}
                        </div>
                        <div className="col-3"></div>
                    </div>
                </div>

                <div className="container mt-1 height-10 jack-bot">
                    <div className="row">
                        <div className="col-md-2 sm-2"></div>
                        <div className="col-md-8 sm-8">
                            <form>
                                <div className="form-row">
                                    <div className="col-2"></div>
                                    <div className="col-6">
                                        <input type="text" className="form-control mt-1" placeholder="Chat" />
                                    </div>
                                    <div className="col-4 ">
                                        <button className="btn btn-outline-success mt-1">Send</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-2 sm-2">
                            <p className='text-right'>Coin: {me.coin}</p>
                        </div>
                    </div>
                    <div className="row justify-content-md-center text-center">
                        <div className="col-sm ">
                            {me.cards.map((card, key) => {
                                return  <img key={key} src="./imgs/poker-symmetric-qr-Plain/2B.svg" alt="..." className="img-thumbnail card__of-me mt-1 mb-2" />
                            })}
                            {/* <img src="./imgs/poker-symmetric-qr-Plain/2B.svg" alt="..." className="img-thumbnail card__of-me mt-1 mb-2" />
                            <img src="./imgs/poker-symmetric-qr-Plain/2B.svg" alt="..." className="img-thumbnail card__of-me mt-1 mb-2" />
                            <img src="./imgs/poker-symmetric-qr-Plain/2B.svg" alt="..." className="img-thumbnail card__of-me mt-1 mb-2" />
                            <img src="./imgs/poker-symmetric-qr-Plain/2B.svg" alt="..." className="img-thumbnail card__of-me mt-1 mb-2" />
                            <img src="./imgs/poker-symmetric-qr-Plain/2B.svg" alt="..." className="img-thumbnail card__of-me mt-1 mb-2" /> */}

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}