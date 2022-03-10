import React, { Component } from 'react';
import { Dashboard } from '../components/dashboard/dashboard';

export class DashboardRoute extends React.Component {
    render() {
        const { logOut } = this.props
        return (
            <Dashboard logOut={logOut}></Dashboard>
        )
    }

}