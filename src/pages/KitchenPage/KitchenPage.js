// React modules
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
// other sub components
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import KitchenDashboard from '../../components/KitchenDashboard/KitchenDashboard';
import AddTripButton from '../../components/AddTripButton/AddTripButton';
// redux
import { useSelector } from 'react-redux';

/*
TODO: if token not found in session storage, redirect to login
*/
const KitchenPage = () => {

    /* -------------------------------------------------------------------------
    redux setup
    ------------------------------------------------------------------------- */

    // subscribe to slices of the store we're interested in
    let isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    return (
        <div>
            <Header/>
            <AddTripButton />
            <KitchenDashboard 
                // user={ this.state.user } 
                // trips={ this.state.trips }
                // fetchTrips={ this.fetchTrips }
                // deleteTripFromDB = { this.deleteTripFromDB }
                // retrieveToken={ this.retrieveToken } 
                />
            <Footer />
        </div>
    );
}

export default KitchenPage;
