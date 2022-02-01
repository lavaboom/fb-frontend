// React modules
import React, { Component } from 'react'
// app styles & assets
import './DriverDashboard.scss'
// other sub components
import ModalBid from '../ModalBid/ModalBid'
// 3rd party libraries
import axios from 'axios'
import Icon from '@mdi/react'
import { mdiMapMarkerRadius, mdiHomeAccount, 
    mdiCalendarClock, mdiCurrencyUsd, mdiListStatus } from '@mdi/js'

export default class DriverDashboard extends Component {

    // static variables 
    // apiURL = process.env.REACT_APP_API_URL
    api_url = 'http://localhost:8080/api'

    state = {
        trips: null,
        modalTrip: null,
        showModalBid: false
    }

    /* -------------------------------------------------------------------------
    application logic
    ------------------------------------------------------------------------- */
    fetchNewTrip = () => {
        const token = this.props.retrieveToken();
        axios.get(`${this.api_url}/trips/new`, {
            headers: { Authorization: 'Bearer ' + token }
        }).then((response) => {
            this.setState({ 
                trips: response.data,
            });
        }).catch(() => {
            console.log(`unable to fetch new trips`)
        });
    }

    bidTrip = (bidAmount) => {
        console.log('bidding on trip ' + this.state.modalTrip.id);
        // hit candidate DB to record this bid
        const token = this.props.retrieveToken();
        axios.post(`${this.api_url}/trips/${this.state.modalTrip.id}/candidates`, {
            trip_id: this.state.modalTrip.id,
            candidate_id: this.props.user.id,
            offer: bidAmount,
            candidate_status: 'Pending'
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error)
        });
        this.hideModal();
        
    }

    // funtions to control modal
    showModalBid = (trip) => {
        this.setState({
            modalTrip: trip,
            showModalBid: true
        })
    }

    hideModal = () => {
        
        this.setState({
            showModalBid: false
        })
    };

    /* -------------------------------------------------------------------------
    lifecycle methods
    ------------------------------------------------------------------------- */
    componentDidMount = () => {
        this.fetchNewTrip();
    }    

    /* -------------------------------------------------------------------------
    render
    ------------------------------------------------------------------------- */

    render() {

        return (
            !this.state.trips ? 
            // UI for when there's no trip to display
            <div>
                <p>No trips yet</p>
            </div>
            : 
            (<div>
                <ModalBid 
                    show={ this.state.showModalBid } 
                    handleClose={ () => this.hideModal() } 
                    modalTrip={ this.state.modalTrip } 
                    bidFunction={ this.bidTrip } />
                { this.state.trips.map(trip => (
                    <div key={ trip.id } className='trip'>
                        <div className='trip-details'>
                            <div className='trip-details__row'>
                                <div className='trip-details__label'>
                                    <Icon path={ mdiHomeAccount } title='Origin' size={1} color='SlateGray'/>
                                </div>
                                <div className='trip-details__content'>{ trip.origin }</div>
                            </div>
                            <div className='trip-details__row'>
                                <div className='trip-details__label'>
                                        <Icon path={ mdiMapMarkerRadius } title='Destination' size={1} color='SlateGray'/>
                                </div>
                                <div className='trip-details__content'>{ trip.destination }</div>
                            </div>
                            <div className='trip-details__row'>
                                <div className='trip-details__label'>
                                    <Icon path={ mdiCalendarClock } title='Date' size={1} color='SlateGray'/>
                                </div>
                                <div className='trip-details__content'>{ trip.job_date }</div>
                            </div>
                            <div className='trip-details__row'>
                                <div className='trip-details__label'>
                                    <Icon path={ mdiCurrencyUsd } title='Pay' size={1} color='SlateGray'/>
                                </div>
                                <div className='trip-details__content'>${ trip.payment_amount } (paid by { trip.payment_type })</div>
                            </div>
                            
                            <div className='trip-details__row'>
                                <div className='trip-details__label'>
                                    <Icon path={ mdiListStatus } title='Driver' size={1} color='SlateGray'/>
                                </div>
                                <div className='trip-details__content'>{ trip.status }</div>
                            </div>
                        </div>
                        <div className='trip-buttons__group'>
                            <button className='trip-buttons trip-buttons--bid' onClick={ () => this.showModalBid(trip)}>BID</button>
                        </div>
                    </div>
                ))}
            </div>)
        )}
}
