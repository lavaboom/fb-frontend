// React modules
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// app styles & assets
import './App.scss';
// pages
import LandingPage from './pages/LandingPage/LandingPage';
import KitchenPage from './pages/KitchenPage/KitchenPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import DriverPage from './pages/DriverPage/DriverPage'
import AddTripPage from './pages/AddTripPage/AddTripPage';
import ReviewPage from './pages/ReviewPage/ReviewPage';

export default class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className='app-wrapper'>
            <Switch>
              {/* landing page */}
              <Route path='/' exact component={ LandingPage } />
              {/* authentication */}
              <Route path='/login' component={ LoginPage } />
              <Route path='/signup' component={ SignupPage } />
              {/* kitchen functionality */}
              <Route path='/kitchen' component={ KitchenPage } />
              <Route path='/addtrip' component={ AddTripPage } />
              {/* driver functionality */}
              <Route path='/driver' component={ DriverPage } />
              {/* review functionality */}
              <Route path='/:tripID/:driverID/review' component={ ReviewPage } />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
