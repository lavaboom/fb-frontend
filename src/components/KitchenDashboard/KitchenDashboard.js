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
        tripsWithCandidates: []
    }

    updateAcceptedDriver = (driverID) => {

    }

    // reset trips with driver
    removeTripWithCandidates = (tripID) => {
        let newList = this.state.tripsWithCandidates.filter(elem => {
            return elem !== tripID
        })
        this.setState({tripsWithCandidates: newList});
    }

    // funtions to control modal
    showModal = (trip, modal) => {
        this.setState({
            // update modalTrip if available
            modalTrip: trip ? trip : this.state.modalTrip,
            // toggle the appropriate modal
            showModalDelete: modal === 'delete' ? true : false,
            showModalCandidates: modal === 'candidates' ? true : false,
            showModalAddTrip: modal === 'addtrip' ? true : false,
        })
    }

    hideModal = () => {
        this.setState({
            showModalDelete: false,
            showModalCandidates: false,
            showModalAddTrip: false,
        })
    };

    componentDidMount = () => {
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

    render() {
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
                    data={ this.state.modalTrip } 
                    removeTripWithCandidates = { this.removeTripWithCandidates } />
                <ModalDelete 
                    show={ this.state.showModalDelete } 
                    handleClose={ () => this.hideModal() } 
                    data={ this.state.modalTrip } 
                    deleteFunction={ this.deleteTrip } />
                <ModalAddTrip 
                    show={ this.state.showModalAddTrip } 
                    handleClose={ () => this.hideModal() } />
                
                {/* header area */}
                <div className='table-functionalities'>
                    <h1 className='table-functionalities__title'>Trips</h1>
                    <div className="table-functionalities__wrapper">
                        <a 
                            className='table-functionalities__add' 
                            onClick={ () => this.showModal(null, 'addtrip')}>
                                + Add New Trip
                        </a>
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
                                <div>
                                    <a href={`/trip/${trip.id}`} className='table__link'>
                                        { trip.origin } 
                                    </a>
                                </div>
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
                                this.state.tripsWithCandidates.indexOf(trip.id) > -1 ? <button onClick={ () => this.showModal(trip, 'candidates') }>CLICK TO ACCEPT</button> : <div>PENDING</div>}
                            </div>
                            {/* action */}
                            <div className='table__action-wrapper'>
                                <img src={ iconDelete } alt='delete' onClick={ () => this.showModal(trip, 'delete') } />
                                <a href={`/Trip/${trip.id}/edit`}><img src={ iconEdit } alt='edit' /></a>
                            </div>
                        </div> // <div className='table__row'>
                    ))}
                </div> {/* <div className='table'> */}
            </div>)
        )
    }
}
