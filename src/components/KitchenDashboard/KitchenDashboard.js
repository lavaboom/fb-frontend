// React modules
import React, { Component } from 'react'
// app styles & assets
import './KitchenDashboard.scss'
import addRecord from '../../assets/Icons/add_item.svg'
// other sub components
import ModalDelete from '../ModalDelete/ModalDelete'
import ModalEditTrip from '../ModalEditTrip/ModalEditTrip'
import ModalCandidates from '../ModalCandidates/ModalCandidates'
// 3rd party libraries
import axios from 'axios'
import Icon from '@mdi/react'
import { mdiMapMarkerRadius, mdiHomeAccount, 
    mdiCalendarClock, mdiCurrencyUsd, mdiCarHatchback } from '@mdi/js'

export default class KitchenDashboard extends Component {

    // static variables 
    // apiURL = process.env.REACT_APP_API_URL
    api_url = 'http://localhost:8080/api'

    state = {
        showModalEditTrip: false,
        showModalDelete: false,
        showModalCandidates: false,
        modalTrip: '',
        modalCandidates: null,
        tripsWithCandidates: []
    }

    /* -------------------------------------------------------------------------
    application logic
    ------------------------------------------------------------------------- */

    completeTrip = (tripID) => {
        const token = this.props.retrieveToken();
        axios.put(`${this.api_url}/trips/${tripID}`, {
            status: 'COMPLETED',
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            console.log('response from completeTrip: ' + response)
        }).catch(() => {
            console.log('Unable to update trips for this user')
        });
        // fetch trip again
        this.props.fetchTrips();
        // close all modal
        this.hideModal();
    }

    updateAcceptedDriver = (driverID) => {
        console.log('driver ' + driverID + ' was accepted')
        // update trip with this driver ID
        const token = this.props.retrieveToken();
        axios.put(`http://localhost:8080/api/trips/${this.state.modalTrip.id}`, {
            driver_id: driverID,
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((response) => {
            console.log(`editted ${response.data} row when updating accepted driver`);
        })
        .catch((error) => {
            console.log(error)
        });
        // hit candidate DB and change status of accepted driver
        axios.put(`http://localhost:8080/api/trips/${this.state.modalTrip.id}/candidates`, {
            candidate_id: driverID,
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((response) => {
            console.log(`editted ${response.data} row when updating candidates`);
        })
        .catch((error) => {
            console.log(error)
        });
        // re-fetch trips with candidates
        this.fetchTripsWithCandidates();
        // close the modal
        this.hideModal();
    };


    loadCandidates = (trip) => {
        const token = this.props.retrieveToken();
        axios.get(`${this.api_url}/trips/${trip.id}/candidates`, {
            headers: { Authorization: 'Bearer ' + token }
        }).then((response) => {
            this.setState({ 
                modalCandidates: response.data,
                showModalCandidates: true,
                modalTrip: trip,                
            });
        }).catch(() => {
            console.log(`unable to fetch candidates for trip ${trip.id}`)
        });
    }

    fetchTripsWithCandidates = () => {
        // fetch trips with active candidates
        const token = this.props.retrieveToken();
        axios.get(`${this.api_url}/users/${this.props.user.id}/trips-with-candidates`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            this.setState({
                tripsWithCandidates: response.data
            });
        }).catch(() => {
            console.log('Unable to fetch candidates for this user')
        });
    }

    deleteTrip = () => {
        // request server to delete this trip
        this.props.deleteTripFromDB(this.state.modalTrip.id);
        // close the modal
        this.setState({ showModalDelete: false });
    }

    /* -------------------------------------------------------------------------
    modals
    ------------------------------------------------------------------------- */
    showModal = (trip, modal) => {
        this.setState({
            modalTrip: trip,
            // toggle the appropriate modal
            showModalDelete: modal === 'delete' ? true : false,
            showModalCandidates: modal === 'candidates' ? true : false,
            showModalEditTrip: modal === 'edit' ? true : false,
        })
    }

    hideModal = () => {
        this.setState({
            showModalDelete: false,
            showModalCandidates: false,
            showModalEditTrip: false,
        })
    };

    /* -------------------------------------------------------------------------
    lifecycle methods
    ------------------------------------------------------------------------- */
    componentDidMount = () => {
        this.fetchTripsWithCandidates();
    }    

    /* -------------------------------------------------------------------------
    render
    ------------------------------------------------------------------------- */

    render() {

        return (
            this.props.trips.length === 0 ? 
                // UI for when there's no trip to display
                <div className='no-trips'>
                    <img className='no-trips__img' src={ addRecord } alt='Add record' />
                    <p className='no-trips__content'>You don't have any active trips. Click the button above to create one</p>
                </div>
                 : 
            (<div>
                {/* Modals */}
                <ModalCandidates 
                    show={ this.state.showModalCandidates } 
                    handleClose={ () => this.hideModal() } 
                    candidates= {this.state.modalCandidates } 
                    updateAcceptedDriver = { this.updateAcceptedDriver } />
                <ModalDelete 
                    show={ this.state.showModalDelete } 
                    handleClose={ () => this.hideModal() } 
                    data={ this.state.modalTrip } 
                    deleteFunction={ this.deleteTrip } />
                <ModalEditTrip 
                    user={ this.props.user }
                    retrieveToken={ this.props.retrieveToken }
                    show={ this.state.showModalEditTrip } 
                    handleClose={ () => this.hideModal() }
                    fetchTrips={ this.props.fetchTrips }
                    modalTrip={ this.state.modalTrip } />
                
                {/* table area - header */}
                { this.props.trips.map(trip => (
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
                            
                            <div className='trip-details__row trip-details__row--driver'>
                                <div className='trip-details__label'>
                                    <Icon path={ mdiCarHatchback } title='Driver' size={1} color='SlateGray'/>
                                </div>
                                <div className='trip-details__content'>
                                    {!this.state.tripsWithCandidates ? <p>CHECKING...</p> : 
                                    this.state.tripsWithCandidates.indexOf(trip.id) > -1 ? 
                                        <button className='trip-details__status trip-details__status--select-driver' onClick={ () => this.loadCandidates(trip) }>Driver found - Click to accept</button> : 
                                        <div className='trip-details__status-container'>
                                            { trip.driver_id ? 
                                            <div>
                                                <div className='trip-details__status-text'>Being delivered by #{trip.driver_id}</div>
                                                <div><button className='trip-details__status trip-details__status--mark-complete' onClick={ () => { this.completeTrip(trip.id)}}>Mark as complete</button></div>
                                            </div> : 
                                            <div><button className='trip-details__status trip-details__status--pending'>Driver Pending</button></div>
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='trip-buttons__group'>
                            <button className='trip-buttons trip-buttons--edit' onClick={ () => this.showModal(trip, 'edit')}>EDIT</button>
                            <button className='trip-buttons trip-buttons--delete' onClick={ () => this.showModal(trip, 'delete')}>DELETE</button>
                        </div>
                    </div>
                ))}
            </div>)
        )
    }
}
