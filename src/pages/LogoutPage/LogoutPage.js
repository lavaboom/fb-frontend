// React modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// app styles & assets
import './LogoutPage.scss'
import happyPhoto from '../../assets/Icons/happy.svg'
// other sub components
import LandingPageNav from '../../components/LandingPageNav/LandingPageNav';


export default class LogoutPage extends Component {

    /* -------------------------------------------------------------------------
    render
    ------------------------------------------------------------------------- */

    render() {
        return (
            <div>
                <LandingPageNav />
                <div className='thanks-note'>
                    <img src={ happyPhoto } className='thanks-note__img' alt='Rider'/>
                    <div className='thanks-note__message'>See you again soon!</div>
                    <Link to={'/'}>
                        <button className='thanks-note__button'>HOME</button>
                    </Link>
                </div>
            </div>
        );
    }
}
