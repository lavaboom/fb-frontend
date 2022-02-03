// React modules
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
// app styles & assets
import './ReviewPage.scss'
import profilePic from '../../assets/images/rabbids.png'
import iconStar from '../../assets/Icons/star.svg'
// other sub components
import Loading from '../../components/Loading/Loading';
import Header from '../../components/Header/Header'
// 3rd parties libraries
import axios from 'axios';
import Icon from '@mdi/react'
import { mdiArrowLeftCircle } from '@mdi/js'


export default class ReviewPage extends Component {

    API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api'

    state = {
        user: null,
        driver: null,
        failedAuth: false,
        backHome: false,
        thankYouPage: false,
        logout: false,
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
            failedAuth: true,
            logout: true
        })
    };

    /* -------------------------------------------------------------------------
    application logic
    ------------------------------------------------------------------------- */
    
    setRating = (score) => {
        let desc = ['', 'Disappointing', 'Could be better', 'OK', 'Very good', 'Exceptional']
        this.setState({
            rating: score,
            ratingDesc: desc[score]
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const token = this.retrieveToken();
        axios.post(`${this.API_URL}/reviews/${this.props.match.params.tripID}/${this.props.match.params.driverID}`, {
            authorID: this.state.user.id,
            score: this.state.rating,
            text: event.target.reviewText.value,
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((response) => {
            this.setState({thankYouPage: true})
        })
        .catch((error) => {
            console.log(error)
        });
    };

    fetchDriver = () => {
        console.log('fetching driver ' + this.props.match.params.driverID);
        const token = this.retrieveToken();
        // Get user data from the API
        axios.get(`${this.API_URL}/users/${this.props.match.params.driverID}/details`, {
            headers: { Authorization: 'Bearer ' + token }
        }).then((response) => {
            this.setState({ 
                driver: response.data,
            });
        }).catch(() => {
            console.log('Cannot fetch driver info')
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
            this.setState({ 
                user: response.data,
                failedAuth: false
            });
            this.fetchDriver();
        }).catch(() => {
            // this.setState({ failedAuth: true })
            console.log('Error retrieving user')
        });
    }    

    /* -------------------------------------------------------------------------
    render
    ------------------------------------------------------------------------- */

    render() {

        // go to logout page
        if (this.state.logout) {
            return (
                <Redirect to='/logout' />
            )
        }

        // go to thank you page
        if (this.state.thankYouPage) {
            return (
                <Redirect to='/thank-you' />
            )
        }
        
        // go back home after info submitted
        if (this.state.backHome) {
            return (
                <Redirect to='/kitchen' />
            )
        }

        // if user not logged in
        if (this.state.failedAuth) {
            return <Redirect to='/login' />
        }

        // if user not yet loaded
        if (!this.state.user || !this.state.driver) {
            return (
                <Loading/>
            )
        }

        // fully functional view
        return (
            <div>
                <Header 
                    user={ this.state.user } handleLogout={ this.handleLogout } />
                {/* form area */}
                <div className='container'>
                    <div className='container-menu'>
                        <Link className='container-menu__icon' to='/kitchen'>
                            <Icon path={ mdiArrowLeftCircle } title='Add' size={1} color='red'/>
                        </Link>
                        <div className='container-menu__text'>Cancel</div>
                    </div>
                    <h1 className='container-header'>Trip Completed!</h1>
                    <h2 className='container-subheader'>Please rate {this.state.driver.name}'s service</h2>
                    <form className='review' onSubmit={ this.handleSubmit }>
                        <div className='review__driver-photo-containers'>
                            <img className='review__driver-photo' src={ profilePic } alt='driver' />
                        </div>
                        <div className='review__driver-rating'>
                            <div className='review__stars-container'>
                                <img className={`review__star ${ this.state.rating >= 1 ? 'review__star--filled' : ''}`} src={ iconStar } alt='rating' onClick={ () => this.setRating(1) } />
                                <img className={`review__star ${ this.state.rating >= 2 ? 'review__star--filled' : ''}`} src={ iconStar } alt='rating' onClick={ () => this.setRating(2) } />
                                <img className={`review__star ${ this.state.rating >= 3 ? 'review__star--filled' : ''}`} src={ iconStar } alt='rating' onClick={ () => this.setRating(3) } />
                                <img className={`review__star ${ this.state.rating >= 4 ? 'review__star--filled' : ''}`} src={ iconStar } alt='rating' onClick={ () => this.setRating(4) } />
                                <img className={`review__star ${ this.state.rating >= 5 ? 'review__star--filled' : ''}`} src={ iconStar } alt='rating' onClick={ () => this.setRating(5) } />
                            </div>
                            <div className='review__stars-description'>{ this.state.rating === 0 ? 'How was the delivery?' : this.state.ratingDesc }</div>
                        </div>
                        <div className='review__input-group'>
                            <label className='review__invisible-label' htmlFor='reviewText'>Details</label>
                            <textarea 
                                className='review__input-field' 
                                rows='3' name='reviewText' id='reviewText' placeholder='Optional detailed review...' />
                        </div>
                        <button className={`review__button review__button--add ${this.state.rating === 0 ? 'review__button--not-ready' : '' }`}  type='submit'>
                            SUBMIT
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

