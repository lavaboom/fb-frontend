// React modules
import React, { Component } from 'react'
// app styles & assets
import './DriverDashboard.scss'
import iconDelete from '../../assets/Icons/delete_outline-24px.svg'
import iconEdit from '../../assets/Icons/edit-24px.svg'
// other sub components
import ModalBid from '../ModalBid/ModalBid'
// 3rd party libraries
import axios from 'axios'

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
    showModal = (trip) => {
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
                {this.state.trips.map(trip => (
                    <div className='row' key={trip.id}>
                        <div>{trip.origin}</div>
                        <div>{trip.destination}</div>
                        <div>
                            <div>{trip.payment_amount}</div>
                            <button onClick={ () => this.showModal(trip) }>BID</button>
                        </div>
                        <div></div>
                    </div>
                ))}
            </div>)
        )}
}
