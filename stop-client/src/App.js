import React, { Component } from 'react';
import Login from './components/Login.js';
import Rooms from './components/Rooms.js'
import socketIOClient from "socket.io-client";
import {
    BrowserRouter as Router,
    Route,
  } from "react-router-dom";

export default class App extends Component {
    constructor(){
        super()
        this.state = {
            endpoint: "http://127.0.0.1:4000",
            socket: '',
            isUserLoggedIn: false
        }
    }

    componentDidMount(){
        if (this.state.socket === '') {
            this.setState({
                socket: socketIOClient(this.state.endpoint) 
            });
            console.log('established connection')
        } 
    }
    render() {
        //Renders only if socket connection has been established
        if (this.state.socket != ''){
            return (
                <Router>
                    {this.state.isUserLoggedIn ? '' : 
                    
                    <Route
                    exact path='/'
                    render={(props) => <Login {...props} socket={this.state.socket} />}
                    />}
    
                    <Route
                    exact path='/rooms'
                    render={(props) => <Rooms {...props} socket={this.state.socket} />}
                    />           
                </Router>
            )
        }
        return (<h3>Loading...</h3>)

    }
}
