// React modules
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
// app styles & assets
import './ThankYouPage.scss'
import thanksPhoto from '../../assets/Icons/thanks.svg'
// other sub components
import Loading from '../../components/Loading/Loading';
import Header from '../../components/Header/Header'
// 3rd parties libraries
import axios from 'axios';


export default class ThankYouPage extends Component {

    API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api'

    state = {
        user: null,
        failedAuth: false,
        rating: 0,
        ratingDesc: '',
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
    lifecycle methods
    ------------------------------------------------------------------------- */

    componentDidMount() {
        const token = this.retrieveToken();
        // Get user data from the API
        axios.get(`${this.API_URL}/users/current`, {
            headers: { Authorization: 'Bearer ' + token }
        }).then((response) => {
            this.setState({ 
                user: response.data,
                failedAuth: false
            });
        }).catch(() => {
            console.log('Error retrieving user')
        });
    }    

    /* -------------------------------------------------------------------------
    render
    ------------------------------------------------------------------------- */

    render() {

        // go back home after info submitted
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
                <Loading/>
            )
        }

        // fully functional view
        return (
            <div>
                <Header 
                    user={ this.state.user } handleLogout={ this.handleLogout } />
                <div className='thanks-note'>
                    <img src={ thanksPhoto } className='thanks-note__img' alt='Rider'/>
                    <div className='thanks-note__message'>Thanks for using Food Bunnies!</div>
                    <Link to={'/kitchen'}>
                        <button className='thanks-note__button'>CLOSE</button>
                    </Link>
                </div>
            </div>
        );
    }
}

