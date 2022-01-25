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
    failedAuth: false
}

  componentDidMount() {
      const token = sessionStorage.getItem('token');

      if (!token) {
          this.setState({ failedAuth: true });
          return;
      }

      // Get the data from the API
      axios
          .get('http://localhost:8080/api/users/current', {
              headers: {
                  Authorization: 'Bearer ' + token
              }
          })
          .then((response) => {
              this.setState({
                  user: response.data
              });
          })
          .catch(() => {
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
        <KitchenDashboard user={ this.state.user } />
      </div>
    );
  }
}
