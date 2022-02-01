// React modules
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
// app styles & assets
import './ThankYouPage.scss'
import thanksPhoto from '../../assets/Icons/thanks.svg'
// other sub components
import Header from '../../components/Header/Header'
// 3rd parties libraries
import axios from 'axios';


export default class ThankYouPage extends Component {

    api_url = 'http://localhost:8080/api'

    state = {
        user: null,
        failedAuth: false,
        backHome: false,
        rating: 0,
        ratingDesc: '',
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

        // go back home after info submitted
        if (this.state.backHome) {
            return (
                <Redirect to='/kitchen' />
            )
        }

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
                <div className='thanks-note'>
                    <img src={ thanksPhoto } className='thanks-note__img' alt='Rider image'/>
                    <div className='thanks-note__message'>Thanks for using Food Bunnies!</div>
                    <Link to={'/kitchen'}>
                        <button className='thanks-note__button'>CLOSE</button>
                    </Link>
                </div>
            </div>
        );
    }
}

