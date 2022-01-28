// React modules
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
// app styles & assets
import './KitchenPage.scss';
// other sub components
import Header from '../../components/Header/Header'
import KitchenDashboard from '../../components/KitchenDashboard/KitchenDashboard';
// 3rd parties libraries
import axios from 'axios';

export default class KitchenPage extends Component {

    api_url = 'http://localhost:8080/api'

    state = {
        user: null,
        failedAuth: false,
        trips: [],
    }

    // delete a particular trip
    deleteTripFromDB = (tripID) => {
        const token = sessionStorage.getItem('token');
        // request server to delete this trip
        axios.delete(this.api_url + '/trips/' + tripID, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(response => {
            // fetch new trip list
            this.fetchTrips();
        })
        .catch(error => { console.log(error) });    
    }

    // fetch all trips of this user from DB
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
            headers: { Authorization: 'Bearer ' + token }
        }).then((response) => {
            this.setState({ user: response.data });
            // fetch trip data
            this.fetchTrips();
        }).catch(() => {
            this.setState({ failedAuth: true })
        });
    }

    // log user out
    handleLogout = () => {
        sessionStorage.removeItem('token');
        this.setState({
            user: null,
            failedAuth: true
        })
    };

    render() {

        // if user not logged in
        if (this.state.failedAuth) {
            return (
            <main className='dashboard'>
            <p>You must be logged in to see this page. <Link to='/login'>Log in</Link></p>
            </main>
            )
        }

        // if user not yet loaded
        if (!this.state.user) {
            return (
            <main className='dashboard'>
            <p>Loading...</p>
            </main>
            )
        }

        // fully functional view
        return (
            <div>
                <Header 
                    user={ this.state.user } 
                    handleLogout={ this.handleLogout } />
                <KitchenDashboard 
                    user={ this.state.user } 
                    trips={ this.state.trips }
                    fetchTrips={ this.fetchTrips }
                    deleteTripFromDB = { this.deleteTripFromDB } />
            </div>
        );
    }
}
