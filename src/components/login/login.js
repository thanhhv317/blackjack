import React, { Component } from 'react';
import {
    NavLink
} from "react-router-dom";
import * as axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkEmpty } from '../../utils/check-empty.utils';

class Login extends React.Component {

    setToken;
    setUserLoginInfo;

    componentDidMount() {
        const { setToken, setUserLoginInfo } = this.props;
        this.setToken = setToken;
        this.setUserLoginInfo = setUserLoginInfo;
    }

    initialState = {
        username: '',
        password: '',
        isLoading: false
    }

    state = this.initialState;

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    login() {
        const loginUrl = 'http://localhost:3333/auth/login'
        const { username, password, isLoading, setToken, setUserLoginInfo } = this.state;
        const _this = this;
        if (!isLoading) {
            if (checkEmpty(username) || checkEmpty(password)) {
                toast.error('Nhap du thong tin vao gium', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                this.setState({
                    isLoading: true
                })
                axios({
                    method: 'post',
                    url: loginUrl,
                    data: {
                        username,
                        password
                    }
                }).then((user) => {
                    toast.success('Dang nhap thanh cong', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    this.setUserLoginInfo(JSON.stringify(user?.data));
                    this.setToken(user.data?.token)
                }).catch(function (error) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        toast.error(error.response.data.message, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        _this.setState({
                            isLoading: false
                        })
                    }

                });
            }
        }
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6 col-md-6 col-lg-6 col-sm-12">
                        <img src="login.webp" alt="" />
                    </div>
                    <div className="col-6 col-md-6 col-lg-6 col-sm-12">
                        <div className="text-center mt-5 mb-5">
                            <h1 className="login-text">
                                Login
                            </h1>
                        </div>
                        <form>
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" name="username" onChange={this.handleChange} className="form-control" placeholder="Enter username" />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" onChange={this.handleChange} className="form-control" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <label>
                                    <NavLink
                                        to={`/register`}
                                    >
                                        ban chua co tai khoan
                                    </NavLink>
                                </label>
                            </div>
                            <input type="button" onClick={() => this.login()} className="btn btn-primary" value="Submit" />
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </div>
        )
    }
}

export default Login;