// React modules
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// app styles & assets
import './App.scss';
import Inventory from './pages/Inventory/Inventory';
// pages
import HomePage from './pages/HomePage/HomePage'
import KitchenPage from './pages/KitchenPage/KitchenPage'
// import DriverPage from './pages/DriverPage/DriverPage'
// other sub components
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

function App() {

  state = {
    user: null
  }

  return (
    <div>
      <BrowserRouter>
        <Header user = { this.state.user } />
        <div className='app-wrapper'>
          <Switch>
            <Route path='/' exact component={ HomePage } />
            {/* routes for user profile Kitchen */}
            <Route path='/kitchen' exact render={(props) => <KitchenPage {...props} user = { this.state.user } />} />
            <Route path='/kitchen/add-job' exact render={(props) => <JobAddPage {...props} user = { this.state.user } />} />
            {/* routes for user profile Driver */}
            {/* <Route path='/driver' exact render={(props) => <DriverPage {...props} user = { this.state.user } />} /> */}
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
