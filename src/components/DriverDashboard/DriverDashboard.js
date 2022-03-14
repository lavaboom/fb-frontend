// React modules
import React, { Component } from 'react'
// app styles & assets
import './DriverDashboard.scss'
import waitPhoto from '../../assets/Icons/wait.svg'
// other sub components
import ModalBid from '../ModalBid/ModalBid'
// 3rd party libraries
import axios from 'axios'
import Icon from '@mdi/react'
import { mdiMapMarkerRadius, mdiHomeAccount, mdiClipboardText,
    mdiCalendarClock, mdiCurrencyUsd, mdiListStatus } from '@mdi/js'

export default class DriverDashboard extends Component {

    // static variables     
    API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api'

    state = {
        trips: null,
        modalTrip: null,
        showModalBid: false,
        tripsWithBids: null
    }

    /* -------------------------------------------------------------------------
    application logic
    ------------------------------------------------------------------------- */
    fetchNewTrip = () => {
        const token = this.props.retrieveToken();
        axios.get(`${this.API_URL}/trips/new`, {
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
        axios.post(`${this.API_URL}/trips/${this.state.modalTrip.id}/candidates`, {
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
            // fetch bid status again
            this.fetchBidTrips();
        })
        .catch((error) => {
            console.log(error)
        });
        this.hideModal();
    }

    fetchBidTrips = () => {
        const token = this.props.retrieveToken();
        axios.get(`${this.API_URL}/users/${this.props.user.id}/trips-i-bid-on`, {
            headers: { Authorization: 'Bearer ' + token }
        }).then((response) => {
            this.setState({ 
                tripsWithBids: response.data,
            });
        }).catch(() => {
            console.log(`unable to fetch new trips`)
        });
    }

    /* -------------------------------------------------------------------------
    modal
    ------------------------------------------------------------------------- */
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
        this.fetchBidTrips();
    }    

    /* -------------------------------------------------------------------------
    render
    ------------------------------------------------------------------------- */

    render() {
        console.log(this.state.tripsWithBids);
        return (
            !this.state.trips ? 
            // UI for when there's no trip to display
            <div className='no-trips'>
                    <img className='no-trips__img' src={ waitPhoto } alt='Wait for trips' />
                    <p className='no-trips__content'>There are no active trips currently. Please check back later</p>
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
                            {/* origin */}
                            <div className='trip-details__row'>
                                <div className='trip-details__label'>
                                    <Icon path={ mdiHomeAccount } title='Origin' size={1} color='SlateGray'/>
                                </div>
                                <div className='trip-details__content'>{ trip.origin }</div>
                            </div>
                            {/* destination */}
                            <div className='trip-details__row'>
                                <div className='trip-details__label'>
                                        <Icon path={ mdiMapMarkerRadius } title='Destination' size={1} color='SlateGray'/>
                                </div>
                                <div className='trip-details__content'>{ trip.destination }</div>
                            </div>
                            {/* delivery date */}
                            <div className='trip-details__row'>
                                <div className='trip-details__label'>
                                    <Icon path={ mdiCalendarClock } title='Date' size={1} color='SlateGray'/>
                                </div>
                                <div className='trip-details__content'>{ trip.job_date }</div>
                            </div>
                            {/* payment amount */}
                            <div className='trip-details__row'>
                                <div className='trip-details__label'>
                                    <Icon path={ mdiCurrencyUsd } title='Pay' size={1} color='SlateGray'/>
                                </div>
                                <div className='trip-details__content'>${ trip.payment_amount } (paid by { trip.payment_type })</div>
                            </div>
                            {/* note for driver */}
                            <div className='trip-details__row'>
                                <div className='trip-details__label'>
                                    <Icon path={ mdiClipboardText } title='Date' size={1} color='SlateGray'/>
                                </div>
                                <div className='trip-details__content'>{ trip.note }</div>
                            </div>
                            {/* bid info */}
                            <div className='trip-details__row'>
                                <div className='trip-details__label'>
                                    <Icon path={ mdiListStatus } title='Driver' size={1} color='SlateGray'/>
                                </div>
                                <div className='trip-details__content'>
                                    { 
                                        this.state.tripsWithBids && (this.state.tripsWithBids.indexOf(trip.id) > -1) ? 
                                        <div>Bid submitted	✔</div> : 
                                        <div>{trip.status}</div> 
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='trip-buttons__group'>
                            <button className={`trip-buttons trip-buttons--bid ${this.state.tripsWithBids && (this.state.tripsWithBids.indexOf(trip.id) > -1) ? 'trip-buttons--no-click' : ''}`} onClick={ () => this.showModalBid(trip)}>BID</button>
                        </div>
                    </div>
                ))}
            </div>)
        )}
}
