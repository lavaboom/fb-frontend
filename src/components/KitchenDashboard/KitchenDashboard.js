// React modules
import React, { Component } from 'react'
// app styles & assets
import './KitchenDashboard.scss'
import iconDelete from '../../assets/Icons/delete_outline-24px.svg'
import iconEdit from '../../assets/Icons/edit-24px.svg'
// other sub components
import ModalDelete from '../ModalDelete/ModalDelete'
import ModalAddTrip from '../ModalAddTrip/ModalAddTrip'
import ModalCandidates from '../ModalCandidates/ModalCandidates'

// 3rd party libraries
import axios from 'axios'

export default class KitchenDashboard extends Component {

    // static variables 
    // apiURL = process.env.REACT_APP_API_URL
    api_url = 'http://localhost:8080/api'

    state = {
        showModalAddTrip: false,
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

    // funtions to control modal
    showModal = (trip, modal) => {
        this.setState({
            modalTrip: trip,
            // toggle the appropriate modal
            showModalDelete: modal === 'delete' ? true : false,
            showModalCandidates: modal === 'candidates' ? true : false,
            showModalAddTrip: modal === 'addtrip' ? true : false,
        })
    }

    hideModal = () => {
        let emptyTrip = {
            origin: null,
            destination: null,
            job_date: null,
            payment_type: null,
            payment_amount: null
        };
        this.setState({
            showModalDelete: false,
            showModalCandidates: false,
            showModalAddTrip: false,
            modalTrip: emptyTrip
        })
    };

    fetchTripsWithCandidates = () => {
        // fetch trips with active candidates
        const token = sessionStorage.getItem('token');
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
    lifecycle methods
    ------------------------------------------------------------------------- */
    componentDidMount = () => {
        this.fetchTripsWithCandidates();
    }    

    /* -------------------------------------------------------------------------
    render
    ------------------------------------------------------------------------- */

    render() {

        let emptyTrip = {
            origin: null,
            destination: null,
            job_date: null,
            payment_type: null,
            payment_amount: null
        }

        return (
            this.props.trips.length === 0 ? 
                // UI for when there's no trip to display
                <div>
                    <p>No trips yet</p>
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
                <ModalAddTrip 
                    user={ this.props.user }
                    retrieveToken={ this.props.retrieveToken }
                    show={ this.state.showModalAddTrip } 
                    handleClose={ () => this.hideModal() }
                    fetchTrips={ this.props.fetchTrips }
                    modalTrip={ this.state.modalTrip } />
                
                {/* header area */}
                <div className='table-functionalities'>
                    <h1 className='table-functionalities__title'>Trips</h1>
                    <div className="table-functionalities__wrapper">
                        <button 
                            className='table-functionalities__add' 
                            onClick={ () => this.showModal(emptyTrip, 'addtrip')}>
                                + Add New Trip
                        </button>
                    </div>
                </div>

                {/* table area - header */}
                <div className='table'>
                    <div className='table__header'>
                        <h4 className='table__header-item table__header-item--origin'>ORIGIN</h4>
                        <h4 className='table__header-item table__header-item--destination'>DESTINATION</h4>
                        <h4 className='table__header-item table__header-item--job-date'>JOB DATE</h4>
                        <h4 className='table__header-item table__header-item--payment-type'>PAYMENT TYPE</h4>
                        <h4 className='table__header-item table__header-item--pay'>PAY</h4>
                        <h4 className='table__header-item table__header-item--status'>STATUS</h4>
                        <h4 className='table__header-item table__header-item--driver'>DRIVER</h4>
                        <h4 className='table__header-item table__header-item--actions'>ACTIONS</h4>
                    </div>

                    {/* table area -  each row of the table */}
                    { this.props.trips.map(trip => (
                        <div key={ trip.id } className='table__row'>
                            {/* origin */}
                            <div className='table__cell table__cell--origin'>
                                <div className='table__label'>ORIGIN</div>
                                <div>{ trip.origin }</div>
                            </div>
                            {/* destination */}
                            <div className='table__cell table__cell--destination'>
                                <div className='table__label'>DESTINATION</div>
                                <div>{ trip.destination }</div>
                            </div>
                            {/* job date */}
                            <div className='table__cell table__cell--job-date'>
                                <div className='table__label'>JOB DATE</div>
                                <div>{ trip.job_date.toString() }</div>
                            </div>
                            {/* payment type */}
                            <div className='table__cell table__cell--payment-type'>
                                <div className='table__label'>PAYMENT TYPE</div>
                                <div>{ trip.payment_type }</div>
                            </div>
                            {/* pay */}
                            <div className='table__cell table__cell--pay'>
                                <div className='table__label'>PAY</div>
                                <div>${ trip.payment_amount }</div>
                            </div>
                            {/* status */}
                            <div className='table__cell table__cell--status'>
                                <div className='table__label'>STATUS</div>
                                <div>{ trip.status }</div>
                            </div>
                            {/* driver */}
                            <div className='table__cell table__cell--driver'>
                                <div className='table__label'>DRIVER</div>
                                {!this.state.tripsWithCandidates ? <p>CHECKING...</p> : 
                                this.state.tripsWithCandidates.indexOf(trip.id) > -1 ? <button onClick={ () => this.loadCandidates(trip) }>CLICK TO ACCEPT</button> : 
                                <div>
                                    <div>{ trip.driver_id ? trip.driver_id : 'PENDING'}</div>
                                    <div><button onClick={ () => { this.completeTrip(trip.id)}}>Mark as complete</button></div>
                                </div>}
                            </div>
                            {/* action */}
                            <div className='table__action-wrapper'>
                                <img src={ iconDelete } alt='delete' onClick={ () => this.showModal(trip, 'delete') } />
                                <img src={ iconEdit } alt='edit' onClick={ () => this.showModal(trip, 'addtrip')} />
                            </div>
                        </div> // <div className='table__row'>
                    ))}
                </div> {/* <div className='table'> */}
            </div>)
        )
    }
}
