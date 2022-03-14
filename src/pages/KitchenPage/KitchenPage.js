// React modules
import React from 'react';
import { Redirect } from 'react-router-dom';
// other sub components
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import KitchenDashboard from '../../components/KitchenDashboard/KitchenDashboard';
import AddTripButton from '../../components/AddTripButton/AddTripButton';

const KitchenPage = () => {

    const token = sessionStorage.getItem('token');

    return (
        (!token) ? <Redirect to='/login' /> :
        <div>
            <Header/>
            <AddTripButton />
            <KitchenDashboard />
            <Footer />
        </div>
    );
}

export default KitchenPage;
