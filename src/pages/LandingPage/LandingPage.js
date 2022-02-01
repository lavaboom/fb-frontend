// React modules
import React, { Component } from 'react'
// app styles & assets
import './LandingPage.scss'
// other sub components
import LandingPageNav from '../../components/LandingPageNav/LandingPageNav'
import Icon from '@mdi/react'
import { mdiEmail } from '@mdi/js'

export default class LandingPage extends Component {
    render() {
        return (
            <div>
                <LandingPageNav/>
                <div className='landing'>
                    <div className='landing-hero'>
                        hero
                    </div>
                    <div className='landing-features'>
                        features
                    </div>
                    <div className='landing-social'>
                        community
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
