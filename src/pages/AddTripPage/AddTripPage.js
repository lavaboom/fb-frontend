// React modules
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// app styles & assets
import './AddTripPage.scss'
// other sub components
import Header from '../../components/Header/Header'
// 3rd parties libraries
import axios from 'axios';


export default class AddTripPage extends Component {

    api_url = 'http://localhost:8080/api'

    state = {
        user: null,
        failedAuth: false,
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
            failedAuth: true
        })
    };

    /* -------------------------------------------------------------------------
    lifecycle methods
    ------------------------------------------------------------------------- */

    componentDidMount() {
        const token = this.retrieveToken();
        // Get user data from the API
        axios.get(`${this.api_url}/users/current`, {
            headers: { Authorization: 'Bearer ' + token }
        }).then((response) => {
            this.setState({ 
                user: response.data,
                failedAuth: false
            });
            this.fetchTrips();
        }).catch(() => {
            this.setState({ failedAuth: true })
        });
    }    

    /* -------------------------------------------------------------------------
    render
    ------------------------------------------------------------------------- */

    render() {

        // if user not logged in
        // if (this.state.failedAuth) {
        //     return <Redirect to='/login' />
        // }

        // if user not yet loaded
        if (!this.state.user) {
            return (
            <main>
                <p>Loading...</p>
            </main>
            )
        }

        // fully functional view
        return (
            <div>
                <Header 
                    user={ this.state.user } handleLogout={ this.handleLogout } />
                <div>blah</div>
            </div>
        );
    }
}

