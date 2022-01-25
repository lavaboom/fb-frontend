// React modules
import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom';
// app styles & assets
import './HomePage.scss'
// 3rd party libraries
import axios from 'axios';

export default class HomePage extends Component {

    state = {
        user: null,
        failedAuth: false
    }

    componentDidMount() {
        const token = sessionStorage.getItem('token');

        if (!token) {
            this.setState({ failedAuth: true });
            return;
        }

        // Get user data from the API
        axios.get('http://localhost:8080/api/users/current', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((response) => {
            this.setState({
                user: response.data
            });
        })
        .catch(() => {
            this.setState({
                failedAuth: true
            })
        });
    }

    handleLogout = () => {
        sessionStorage.removeItem('token');
        this.setState({
            user: null,
            failedAuth: true
        })
    };

    render() {
        if (this.state.failedAuth) {
            return (
                <main className='dashboard'>
                    <p>You must be logged in to see this page. <Link to='/login'>Log in</Link></p>
                </main>
            )
        }

        if (!this.state.user) {
            return (
                <main className='dashboard'>
                    <p>Loading...</p>
                </main>
            )
        }

        const { name, email } = this.state.user;

        return (
            <main className='dashboard'>
                <h1 className='dashboard__title'>Dashboard</h1>
                <p>
                    Welcome back, { name }! 👋
                </p>
                <h2>My Profile</h2>
                <p>Email: {email}</p>
                
                <button className='dashboard__logout' onClick={ this.handleLogout }>
                    Log out
                </button>
            </main>
        );
    }
}
