import React, { Component } from 'react';
import Login from "../components/login/login"

export class LoginRoute extends React.Component {
    render() {
        const { setToken, setUserLoginInfo } = this.props;
        return (
            <Login setToken={setToken} setUserLoginInfo={setUserLoginInfo} />
        )
    }

}