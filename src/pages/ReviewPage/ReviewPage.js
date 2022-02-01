// React modules
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
// app styles & assets
import './ReviewPage.scss'
import profilePic from '../../assets/images/rabbids.png'
import iconStar from '../../assets/Icons/star.svg'
// other sub components
import Header from '../../components/Header/Header'
// 3rd parties libraries
import axios from 'axios';
import Icon from '@mdi/react'
import { mdiArrowLeftCircle } from '@mdi/js'


export default class ReviewPage extends Component {

    api_url = 'http://localhost:8080/api'

    state = {
        user: null,
        failedAuth: false,
        backHome: false
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
    application logic
    ------------------------------------------------------------------------- */
    handleSubmit = (event) => {
        event.preventDefault();
        const token = this.retrieveToken();
        // let datetime = event.target.jobDate.value + ' ' + event.target.jobTime.value;
        // axios.post('http://localhost:8080/api/trips/add', {
        //     sender_id: this.state.user.id,
        //     reviewText: event.target.reviewText.value,
        //     destination: event.target.destination.value,
        //     date_posted: new Date(),
        //     job_date: datetime,
        //     note: event.target.note.value,
        //     payment_type: event.target.paymentType.value,
        //     payment_amount: event.target.pay.value
        // }, {
        //     headers: {
        //         Authorization: 'Bearer ' + token
        //     }
        // })
        // .then((response) => {
        //     this.setState({ backHome: true })
            
        // })
        // .catch((error) => {
        //     console.log(error)
        // });
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
                {/* form area */}
                <div className='container'>
                    <div className='container-menu'>
                        <Link className='container-menu__icon' to='/kitchen'>
                            <Icon path={ mdiArrowLeftCircle } title='Add' size={1} color='red'/>
                        </Link>
                        <div className='container-menu__text'>Cancel</div>
                    </div>
                    <h1 className='container-header'>Trip Completed!</h1>
                    <h2 className='container-subheader'>Please rate your driver</h2>
                    <form className='review' onSubmit={ this.handleSubmit }>
                        <div className='review__driver-photo-containers'>
                            <img className='review__driver-photo' src={ profilePic } alt='driver' />
                        </div>
                        <div className='review__driver-rating'>
                            <div className='review__stars-container'>
                                <img className='review_star review_star--filled' src={ iconStar } alt='rating' />
                                <img className='review_star' src={ iconStar } alt='rating' />
                                <img className='review_star' src={ iconStar } alt='rating' />
                                <img className='review_star' src={ iconStar } alt='rating' />
                                <img className='review_star' src={ iconStar } alt='rating' />
                            </div>
                            <div className='review__stars-description'>
                                eh
                            </div>
                        </div>
                        <div className='review__input-group'>
                            <label className='review__invisible-label' htmlFor='reviewText'>Origin</label>
                            <textarea 
                                className='review__input-field' 
                                rows='3' name='reviewText' id='reviewText' placeholder='Optional detailed review' />
                        </div>
                        <button className='review__button review__button--add'  type='submit'>
                            SUBMIT
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

