import React, { Component } from 'react'
import {
    NavLink
} from "react-router-dom";
import { checkEmpty } from '../../utils/check-empty.utils';
import { checkSameValue } from '../../utils/check-same-value.utils';
import * as axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Register extends React.Component {

    initialState = {
        username: '',
        password: '',
        confirmPassword: '',
        isLoading: false
    };

    state = this.initialState;

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        })
    }

    register = async () => {
        const { username, password, confirmPassword, isLoading } = this.state;
        const _this = this;
        if (!isLoading) {
            const registerUrl = 'http://localhost:3333/auth/register'
            if (checkEmpty(username) || checkEmpty(password) || checkEmpty(confirmPassword)) {
                toast.error('Nhap du thong tin vao gium', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else if (!checkSameValue(password, confirmPassword)) {
                toast.error('Mat khau khong trung khop', {
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
                    url: registerUrl,
                    data: {
                        username,
                        password
                    }
                }).then((user) => {
                    toast.success('Dang ky thanh cong', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
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
                        _this.setState(_this.initialState);
                    }
                });
            }
        }

    }

    render() {
        const { username, password, confirmPassword } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-6 col-md-6 col-lg-6 col-sm-12">
                        <img src="login.webp" alt="" />
                    </div>
                    <div className="col-6 col-md-6 col-lg-6 col-sm-12">
                        <div className="text-center mt-5 mb-5">
                            <h1 className="login-text">
                                Register
                            </h1>
                        </div>
                        <form>
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} placeholder="Enter username" />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <label>Password again</label>
                                <input type="password" className="form-control" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <label>
                                    <NavLink
                                        to={`/login`}
                                    >
                                        ban da co tai khoan
                                    </NavLink></label>
                            </div>
                            <input type="button" onClick={() => this.register()} className="btn btn-primary" value="Submit" />
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </div>
        )
    }
}

export default Register;