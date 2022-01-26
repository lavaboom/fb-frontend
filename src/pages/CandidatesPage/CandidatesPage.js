// React modules
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
// app styles & assets
import './CandidatesPage.scss';
// other sub components
import Header from '../../components/Header/Header'
// 3rd parties libraries
import axios from 'axios';

export default class CandidatesPage extends Component {
    
    api_url = 'http://localhost:8080/api'

    state = {
        
    }

    render() {

        return (
            <div>
                {/* <Header user={ this.state.user } handleLogout={ this.handleLogout } /> */}
            </div>
        );
    }
}