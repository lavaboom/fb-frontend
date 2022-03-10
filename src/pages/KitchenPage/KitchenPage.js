// React modules
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
// other sub components
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Loading from '../../components/Loading/Loading';
import KitchenDashboard from '../../components/KitchenDashboard/KitchenDashboard';
import AddTripButton from '../../components/AddTripButton/AddTripButton';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { loadTripsByUser, deleteTrip } from '../../store/slices/trips';

/*
TODO: if token not found in session storage, redirect to login
*/
const KitchenPage = () => {

    /* -------------------------------------------------------------------------
    redux setup
    ------------------------------------------------------------------------- */
    // returns the dispatch function of the redux store
    const dispatch = useDispatch();

    // subscribe to slices of the store we're interested in
    let isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    let user = useSelector(state => state.auth.user);
    let trips = useSelector(state => state.entities.trips.list);

    // fetch trips by user on page load
    useEffect(() => {
        let currentUser = JSON.parse(sessionStorage.getItem('user'));
        dispatch(loadTripsByUser(currentUser.id));
    }, [])

    /* -------------------------------------------------------------------------
    API related
    ------------------------------------------------------------------------- */
    const deleteTripFromDB = (tripID) => {
        dispatch(deleteTrip(tripID));
    }    

    return (
        <div>
            <Header/>
            {/* <AddTripButton user={ this.state.user } /> */}
            {/* <KitchenDashboard 
                user={ this.state.user } 
                trips={ this.state.trips }
                fetchTrips={ this.fetchTrips }
                deleteTripFromDB = { this.deleteTripFromDB }
                retrieveToken={ this.retrieveToken } /> */}
            <Footer />
        </div>
    );
}

export default KitchenPage;
