// React modules
import React, { Component } from 'react'
// app styles & assets
import './KitchenDashboard.scss'
import iconDelete from '../../assets/Icons/delete_outline-24px.svg'
import iconEdit from '../../assets/Icons/edit-24px.svg'
import iconChevron from '../../assets/Icons/chevron_right-24px.svg'
import iconSort from '../../assets/Icons/sort-24px.svg'
// other sub components
import Modal from '../Modal/Modal'

// 3rd party libraries
import axios from 'axios'

export default class KitchenDashboard extends Component {

    // static variables 
    apiURL = process.env.REACT_APP_API_URL
    
    state = {
        showModal: false,
        modalTrip: '',
        filtered: [],
        originalTrips: [],
        trips: null
    }

    // funtions to control modal
    showModal = (trip) => {
        this.setState({ showModal: true, modalTrip: trip });
    };
    
    hideModal = () => {
        this.setState({ showModal: false });
    };

    // function to GET all trips
    // getAllTrips = () => {
    //     axios.get(this.apiURL + 'trip/')
    //     .then(response => {
    //         this.setState({
    //             trips: response.data,
    //             originalTrips: response.data,
    //             filtered: this.generateSearchData(response.data)
    //         })
    //     })
    //     .catch(apiError => { console.log(apiError) });
    // };

    // function to delete the modal's target trip
    // deleteTrip = () => {
    //     // request server to delete this trip
    //     axios.delete(this.apiURL + 'trip/' + this.state.modalTrip.id)
    //     .then(response => {
    //         // set the state with the new list of trips
    //         this.setState({
    //             trips: response.data,
    //             originalTrips: response.data,
    //             filtered: this.generateSearchData(response.data)
    //         })
    //     })
    //     .catch(error => { console.log(error) });
        
    //     // close the modal
    //     this.setState({ showModal: false });
    // }

    render() {
        return (
            !this.props.trips ? <p>No trips yet</p> : 
            (<div>
                {/* Modal */}
                <Modal show={ this.state.showModal } handleClose={ this.hideModal } modalItem={ this.state.modalTrip } deleteFunction={ this.deleteTrip } />
                {/* header area */}
                <div className='table-functionalities'>
                    <h1 className='table-functionalities__title'>Trips</h1>
                    <div className="table-functionalities__wrapper">
                        {/* <input className='table-functionalities__search' onChange={ this.search } type='text' placeholder='Search...' /> */}
                        <a href='/api/trips/add' className='table-functionalities__add'>+ Add New Trip</a>                    
                    </div>
                </div>
                {/* table area */}
                <div className='table'>
                    <div className='table__header'>
                        <h4 className='table__header-item table__header-item--origin'>ORIGIN</h4>
                        <h4 className='table__header-item table__header-item--destination'>DESTINATION</h4>
                        <h4 className='table__header-item table__header-item--job-date'>JOB DATE</h4>
                        <h4 className='table__header-item table__header-item--payment-type'>PAYMENT TYPE</h4>
                        <h4 className='table__header-item table__header-item--pay'>PAY</h4>
                        <h4 className='table__header-item table__header-item--status'>STATUS</h4>
                        <h4 className='table__header-item table__header-item--actions'>ACTIONS</h4>
                    </div>
                    { this.props.trips.map(trip => (
                            // each row of the table
                            <div key={ trip.id } className='table__row'>
                                {/* origin */}
                                <div className='table__cell table__cell--origin'>
                                    <div className='table__label'>ORIGIN</div>
                                    <div>
                                        <a href={`/trip/${trip.id}`} className='table__link'>
                                            { trip.origin } 
                                            <span className='table__inline-icon'><img src={ iconChevron } alt='chevron' /></span>
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
                                <div className='table__action-wrapper'>
                                    <img src={ iconDelete } alt='delete' onClick={ () => this.showModal(trip) } />
                                    <a href={`/Trip/${trip.id}/edit`}><img src={ iconEdit } alt='edit' /></a>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>)
        )
    }
}

