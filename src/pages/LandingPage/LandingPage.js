// React modules
import React, { Component } from 'react'
// app styles & assets
import './LandingPage.scss'
import riderPhoto from '../../assets/Icons/rider.svg'
// other sub components
import LandingPageNav from '../../components/LandingPageNav/LandingPageNav'
import SignUpButton from '../../components/SignUpButton/SignUpButton'
import Icon from '@mdi/react'
import { mdiEmail } from '@mdi/js'

export default class LandingPage extends Component {
    render() {
        return (
            <div>
                <LandingPageNav/>
                <div className='landing'>
                    <div className='landing-hero'>
                        <div className='landing-hero__content'>
                            <h1 className='landing-hero__title'>Craigslist for Food Delivery</h1>
                            <div className='landing-hero__text'>Can cook, can't deliver? We'll find you a driver</div>
                            <SignUpButton/>
                        </div>
                        <img src={ riderPhoto } className='landing-hero__img' alt='Rider image'/>
                    </div>
                    <div className='landing-features'>
                        features
                    </div>
                    <div className='landing-driver'>
                        <div>Drive with us</div>
                        <SignUpButton/>
                    </div>
                    <div className='landing-footer'>
                        <div className='landing-footer__title'>Support</div>
                        <div className='landing-footer__email'>
                            <Icon className='landing-footer__email-icon' path={ mdiEmail } title='Email' size={1}/>
                            <div>hello@FoodBunnies.com</div>
                        </div>
                        <div>Made with &#9829; in Mississauga</div>
                    </div>
                </div>
            </div>
        )
    }
}
