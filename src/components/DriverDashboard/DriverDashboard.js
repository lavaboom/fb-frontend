// React modules
import React, { Component } from 'react'
// app styles & assets
import './DriverDashboard.scss'
import iconDelete from '../../assets/Icons/delete_outline-24px.svg'
import iconEdit from '../../assets/Icons/edit-24px.svg'

// 3rd party libraries
import axios from 'axios'

export default class DriverDashboard extends Component {

    // static variables 
    // apiURL = process.env.REACT_APP_API_URL
    api_url = 'http://localhost:8080/api'

    state = {
        trips: null,
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
            (<div className='container'>
                {this.state.trips.map(trip => (
                    <div className='row' key={trip.id}>
                        <div>{trip.origin}</div>
                        <div>{trip.destination}</div>
                        <div>
                            <div>{trip.payment_amount}</div>
                            <button>BID</button>
                        </div>
                        <div></div>
                    </div>
                ))}
            </div>)
        )}
}
