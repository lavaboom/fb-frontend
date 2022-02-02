// React modules
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// other sub components
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import DriverDashboard from '../../components/DriverDashboard/DriverDashboard';
// 3rd parties libraries
import axios from 'axios';

export default class DriverPage extends Component {

    API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api'

    state = {
        user: null,
        failedAuth: false,
        trips: [],
        logout: false        
    }

    /* -------------------------------------------------------------------------
    authentication related
    ------------------------------------------------------------------------- */ 
    
    // retrieve token from the browser's session
    retrieveToken = () => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            this.setState({ failedAuth: true });
            return;
        }
        return token;
    }

    // log user out
    handleLogout = () => {
        sessionStorage.removeItem('token');
        this.setState({
            user: null,
            failedAuth: true,
            logout: true
        })
    };

    /* -------------------------------------------------------------------------
    API related
    ------------------------------------------------------------------------- */ 
    
    /**
     * delete a trip using its id
     * @param {int} tripID 
     */
    deleteTripFromDB = (tripID) => {
        const token = this.retrieveToken();
        // request server to delete this trip
        axios.delete(this.API_URL + '/trips/' + tripID, {
            headers: { 
                Authorization: 'Bearer ' + token 
            }
        })
        .then(_response => {
            this.fetchTrips();
        })
        .catch(error => { console.log(error) });
    }

    // fetch all trips of this user from DB
    fetchTrips = () => {
        const token = this.retrieveToken();
        axios.get(`${this.API_URL}/users/${this.state.user.id}/trips`, {
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

    /* -------------------------------------------------------------------------
    lifecycle methods
    ------------------------------------------------------------------------- */

    componentDidMount() {
        const token = this.retrieveToken();
        // Get user data from the API
        axios.get(`${this.API_URL}/users/current`, {
            headers: { Authorization: 'Bearer ' + token }
        }).then((response) => {
            this.setState({ user: response.data });
            this.fetchTrips();
        }).catch(() => {
            this.setState({ failedAuth: true })
        });
    }    

    /* -------------------------------------------------------------------------
    render
    ------------------------------------------------------------------------- */
    render() {

        // go back home after logout
        if (this.state.logout) {
            return (
                <Redirect to='/logout' />
            )
        }

        // if user not logged in
        if (this.state.failedAuth) {
            return <Redirect to='/login' />
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
                <DriverDashboard 
                    user={ this.state.user } 
                    retrieveToken={ this.retrieveToken} />
                <Footer />
            </div>
        );
    }
}
