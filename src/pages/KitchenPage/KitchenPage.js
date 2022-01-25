// React modules
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
// app styles & assets
import './KitchenPage.scss';
// other sub components
import Header from '../../components/Header/Header'
import KitchenDashboard from '../../components/KitchenDashboard/KitchenDashboard';
import Modal from '../../components/Modal/Modal';
// 3rd parties libraries
import axios from 'axios';

export default class KitchenPage extends Component {

    state = {
        user: null,
        failedAuth: false,
        trips: [
            {
              id: 1,
              sender_id: 1,
              driver_id: 3,
              origin: 'Toronto',
              destination: 'Vaughan',
              date_posted: new Date(),
              job_date: 'December 17, 2022 03:24:00',
              status: 'IN PROGRESS',
              payment_type: 'Paid by Sender',
              payment_amount: 10,
            },
            {
              id: 2,
              sender_id: 1,
              origin: 'Toronto',
              destination: 'Hamilton',
              date_posted: new Date(),
              job_date: 'December 17, 2022 03:24:00',
              status: 'NEW',
              payment_type: 'Paid by Recipient',
              payment_amount: 20,
            },
            {
              id: 3,
              sender_id: 4,
              driver_id: 2,
              origin: 'Mississauga',
              destination: 'Barrie',
              date_posted: new Date(),
              job_date: 'December 17, 2022 03:24:00',
              status: 'COMPLETED',
              payment_type: 'Paid by Sender',
              payment_amount: 30,
            },
        ]
    }

    componentDidMount() {
        const token = sessionStorage.getItem('token');

        if (!token) {
            this.setState({ failedAuth: true });
            return;
        }

        // Get the data from the API
        axios.get('http://localhost:8080/api/users/current', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            this.setState({
                user: response.data
            });
        }).catch(() => {
            this.setState({
                failedAuth: true
            })
        });
    }

    handleLogout = () => {
        sessionStorage.removeItem('token');
        this.setState({
            user: null,
            failedAuth: true
        })
    };

    render() {

        if (this.state.failedAuth) {
            return (
            <main className='dashboard'>
            <p>You must be logged in to see this page. <Link to='/login'>Log in</Link></p>
            </main>
            )
        }

        if (!this.state.user) {
            return (
            <main className='dashboard'>
            <p>Loading...</p>
            </main>
            )
        }

        return (
            <div>
                <Header user={ this.state.user } handleLogout={ this.handleLogout } />
                <KitchenDashboard user={ this.state.user } trips={ this.state.trips } />
            </div>
        );
    }
}
