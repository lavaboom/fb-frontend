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
// other sub components
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'


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
              {/* <Route path='/login'><LoginPage /></Route>
              <Route path='/signup'><SignupPage /></Route> */}

              {/* routes for user profile Kitchen */}
              {/* <Route path='/kitchen'><KitchenPage /></Route> */}
              {/* <Route path='/kitchen/add-job' exact render={(props) => <JobAddPage {...props} user = { this.state.user } />} /> */}
              
              {/* routes for user profile Driver */}
              {/* <Route path='/driver' exact render={(props) => <DriverPage {...props} user = { this.state.user } />} /> */}
            </Switch>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}
