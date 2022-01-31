// React modules
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
// app styles & assets
import './AddTripPage.scss'
// other sub components
import Header from '../../components/Header/Header'
// 3rd parties libraries
import axios from 'axios';
import Icon from '@mdi/react'
import { mdiArrowLeftCircle } from '@mdi/js'


export default class AddTripPage extends Component {

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
        let datetime = event.target.jobDate.value + ' ' + event.target.jobTime.value;
        axios.post('http://localhost:8080/api/trips/add', {
            sender_id: this.state.user.id,
            origin: event.target.origin.value,
            destination: event.target.destination.value,
            date_posted: new Date(),
            job_date: datetime,
            note: event.target.note.value,
            payment_type: event.target.paymentType.value,
            payment_amount: event.target.pay.value
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((response) => {
            this.setState({ backHome: true })
            
        })
        .catch((error) => {
            console.log(error)
        });
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
                        <div className='container-menu__text'>Go Back</div>
                    </div>
                    <h1 className='container-header'>Delivery details</h1>
                    <form className='form__input-form' onSubmit={ this.handleSubmit }>
                    <div className='form__input-group'>
                        <label className='form__invisible-label' htmlFor='origin'>Origin</label>
                        <input 
                            className='form__input-field form__input-field--no-border' 
                            type='text' name='origin' id='origin' placeholder='Origin' />
                    </div>
                    <div className='form__input-group'>
                        <label className='form__invisible-label' htmlFor='destination'>Destination</label>
                        <input 
                            className='form__input-field form__input-field--no-border' 
                            type='text' name='destination' id='destination' placeholder='Destination' />
                    </div>
                    <div className='form__input-group'>
                        <label className='form__invisible-label' htmlFor='note'>Note for driver</label>
                        <input className='form__input-field form__input-field--no-border' 
                        type='text' name='note' id='note' placeholder='Note for driver' />
                    </div>
                    
                    {/* date & time group */}
                    <div className='form__datetime'>
                        <div className='form__input-group form__datetime-item'>
                            <label className='form__visible-label' htmlFor='jobDate'>Job Date</label>
                            <input className='form__input-field form__input-field--no-border' type='date' name='jobDate' id='jobDate' />
                        </div>
                        <div className='form__input-group form__datetime-item'>
                            <label className='form__visible-label' htmlFor='jobTime'>Time</label>
                            <input className='form__input-field form__input-field--no-border' type='time' name='jobTime' id='jobTime' />
                        </div>
                    </div>
                    
                    <div className='form__input-group'>
                        <p className='form__subheader'>Paid by</p>
                        <div className='wrapper'>
                            <input type='radio' name='paymentType' id='option-1' value={ 'Sender' } 
                                defaultChecked />
                            <input type='radio' name='paymentType' id='option-2' value={ 'Recipient' } />
                            <label htmlFor='option-1' className='option option-1'>
                                <span>Sender</span>
                            </label>
                            <label htmlFor='option-2' className='option option-2'>
                                <span>Recipient</span>
                            </label>
                        </div>
                    </div>
                    <div className='form__input-group'>
                        <label className='form__visible-label' htmlFor='pay'>How much will you pay delivery driver?</label>
                        <input className='form__input-field form__input-field--no-border' type='number' name='pay' id='pay' />
                    </div>
                    <button className='form__button form__button--add'  type='submit'>
                        ADD
                    </button>
                </form>
                </div>
            </div>
        );
    }
}

