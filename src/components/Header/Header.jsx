import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'


export default class Header extends Component {

    state = {
        mobileMenu: false,
    }

    toggleMobileMenu = () => {
        let newValue = this.state.mobileMenu ? false : true;
        this.setState({ mobileMenu: newValue })
    }

    render() {
        const currentURL = window.location.href;
        const isKitchenView = currentURL.indexOf('kitchen') > -1 ? true : false;
        return (
            <header className='header'>
                <nav className='navbar'>
                    <Link to={'./'} className='navbar__logo'>Food Bunnies</Link>
                    <ul className={`navbar__menu ${ this.state.mobileMenu ? 'navbar__menu--active' : '' }`}> 
                        <li className='navbar__item'>
                            <Link className='navbar__link' to={`${ isKitchenView ? '/driver' : '/kitchen'}`}>Switch to {`${ isKitchenView ? 'Driver' : 'Kitchen'}`} view</Link>
                        </li>
                        <li className='navbar__item'>
                            <p>Welcome, { this.props.user.name }</p>
                        </li>
                        <li className='navbar__item'>
                        <button className='navbar__button' onClick={ this.props.handleLogout }>
                            Log out
                        </button>
                        </li>
                    </ul>
                    <div className={`hamburger ${ this.state.mobileMenu ? 'hamburger--active' : '' }`} onClick={ this.toggleMobileMenu }> 
                        <span className='hamburger__bar'></span>
                        <span className='hamburger__bar'></span>
                        <span className='hamburger__bar'></span>
                    </div>
                </nav>
            </header>
        )
    }
}
