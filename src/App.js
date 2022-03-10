import './App.css';
import { Component } from 'react'
import { Outlet, Link } from "react-router-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { LoginRoute } from "./routes/login.jsx"
import RegisterRoute from './routes/register';
import { Dashboard } from './components/dashboard/dashboard';

class App extends Component {

  initialState = {
    token: '',
    room: '',
    userInfo: {},
    headerButtonName: 'Logout'
  }
  state = this.initialState;

  getDataFromLocalstorage() {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('user');
    this.setState({
      token,
      userInfo
    })
  }

  changeHeaderButtonName = (btnName) => {
    this.setState({
      headerButtonName: btnName
    })
  }

  setToken = (token) => {
    localStorage.setItem('token', token);
    console.log("saved token");
    this.setState({ token })
  }

  setUserLoginInfo = (userInfo) => {
    localStorage.setItem("user", userInfo);
    this.setState({
      userInfo
    })
  }

  logOut = () => {
    console.log("out")
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      token: '',
      room: ''
    })
  }

  setRoom = (roomId) => {
    this.setState({
      room: roomId
    });
  }

  componentDidMount() {
    this.getDataFromLocalstorage();
  }

  render() {
    const { token, room, headerButtonName, userInfo } = this.state

    if (!token) {
      return (
        <div className="container">
          <BrowserRouter>
            <Routes>
              <Route path="register" element={<RegisterRoute />} />
              <Route path="login" element={<LoginRoute setToken={this.setToken} setUserLoginInfo={this.setUserLoginInfo} />} />
              <Route path="/" element={<LoginRoute setToken={this.setToken}  setUserLoginInfo={this.setUserLoginInfo} />} />
            </Routes>
          </BrowserRouter>
        </div>
      )
    } else {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="home" element={<Dashboard logOut={this.logOut} userInfo={userInfo} room={room} setRoom={this.setRoom} headerButtonName={headerButtonName} changeHeaderButtonName={this.changeHeaderButtonName} />} />
            <Route path="/" element={<Dashboard logOut={this.logOut} userInfo={userInfo} room={room} setRoom={this.setRoom} headerButtonName={headerButtonName} changeHeaderButtonName={this.changeHeaderButtonName} />} />
          </Routes>
        </BrowserRouter>

      )
    }

  }
}
export default App;
