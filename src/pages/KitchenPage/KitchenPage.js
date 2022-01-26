// React modules
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
// app styles & assets
import './KitchenPage.scss';
// other sub components
import Header from '../../components/Header/Header'
import KitchenDashboard from '../../components/KitchenDashboard/KitchenDashboard';
import Modal from '../../components/Modal/Modal';
// 3rd parties libraries
import axios from 'axios';

export default class KitchenPage extends Component {

    api_url = 'http://localhost:8080/api'

    state = {
        user: null,
        failedAuth: false,
        trips: null,
    }

    fetchTrips = () => {
        const token = sessionStorage.getItem('token');
        axios.get(`${this.api_url}/users/${this.state.user.id}/trips`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            this.setState({
                trips: response.data
            });
        }).catch(() => {
            console.log('Unable to fetch trips for this user')
        });
    }

    componentDidMount() {
        const token = sessionStorage.getItem('token');

        if (!token) {
            this.setState({ failedAuth: true });
            return;
        }

        // Get user data from the API
        axios.get(`${this.api_url}/users/current`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            this.setState({
                user: response.data
            });
            // fetch trip data
            this.fetchTrips();
        }).catch(() => {
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

        return (
            <div>
                <Header user={ this.state.user } handleLogout={ this.handleLogout } />
                <KitchenDashboard user={ this.state.user } trips={ this.state.trips } />
            </div>
        );
    }
}
