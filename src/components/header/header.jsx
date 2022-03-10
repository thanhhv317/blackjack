import React, { Component } from 'react'

export class Header extends React.Component {

    socket;
    constructor(props) {
        super(props)
        this.socket = props.socket;
    }


    componentDidMount() {
        const { room, changeHeaderButtonName, socket } = this.props;
        this.socket = socket;
        if (!!room) {
            changeHeaderButtonName("Leave")
        }
    }

    logOutOrLeave() {
        const { logOut, room, setRoom, changeHeaderButtonName } = this.props;
        setRoom("");
        if (!!room) {
            // leave room 
            this.props.socket.emit("leave_room", room, (response) => {
                console.log(response);
            })

            changeHeaderButtonName("Logout")
        } else {
            logOut();
        }
    }

    render() {
        const { headerButtonName } = this.props;


        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">LOGO WEB</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Thanh hv <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">10</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"> 23</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                2.000
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">5000  </a>
                                <a className="dropdown-item" href="#">10000  </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">20000 n</a>
                            </div>
                        </li>
                    </ul>

                    <form className="form-inline my-2 my-lg-0">
                        <input type="button" onClick={() => this.logOutOrLeave()} className="btn btn-outline-success my-2 my-sm-0" value={headerButtonName} />
                    </form>
                </div>
            </nav>
        )
    }
}