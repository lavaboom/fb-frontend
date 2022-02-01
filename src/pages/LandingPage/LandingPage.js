// React modules
import React, { Component } from 'react'
// app styles & assets
import './LandingPage.scss'
// other sub components
import LandingPageNav from '../../components/LandingPageNav/LandingPageNav'


export default class LandingPage extends Component {
    render() {
        return (
            <div>
                <LandingPageNav/>
            </div>
        )
    }
}
