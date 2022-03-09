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
import ThankYouPage from './pages/ThankYouPage/ThankYouPage';
import LogoutPage from './pages/LogoutPage/LogoutPage';
// Redux store
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className='app-wrapper'>
            <Switch>
              {/* general pages */}
              <Route path='/' exact component={ LandingPage } />
              <Route path='/thank-you' exact component={ ThankYouPage } />
              <Route path='/logout' exact component={ LogoutPage } />
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
      </Provider>
    );
  }
}
