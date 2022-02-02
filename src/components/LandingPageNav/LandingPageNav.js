import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// app styles & assets
import './LandingPageNav.scss'
// other sub components
import SignUpButton from '../SignUpButton/SignUpButton';

export default class LandingPageNav extends Component {
    
    state = {
        mobileMenu: false,
    }

    toggleMobileMenu = () => {
        let newValue = this.state.mobileMenu ? false : true;
        this.setState({ mobileMenu: newValue })
    }

    render() {
    return (
        <nav className='fixed-navbar'>
            <Link to={'./'} className='fixed-navbar__logo'>Food Bunnies</Link>
            <ul className={`fixed-navbar__menu ${ this.state.mobileMenu ? 'fixed-navbar__menu--active' : '' }`}> 
                <li className='fixed-navbar__item'>
                    <Link className='fixed-navbar__link' to={'/#'}>About</Link>
                </li>
                <li className='fixed-navbar__item'>
                    <Link className='fixed-navbar__link' to={'/#'}>Features</Link>
                </li>
                <li className='fixed-navbar__item'>
                    <SignUpButton/>
                </li>
                <li className='fixed-navbar__item'>
                    <Link to={'/login'}>
                        <button className='fixed-navbar__button fixed-navbar__button--login'>
                            Log in
                        </button>
                    </Link>
                </li>
            </ul>
            <div className={`hamburger ${ this.state.mobileMenu ? 'hamburger--active' : '' }`} onClick={ this.toggleMobileMenu }> 
                <span className='hamburger__bar'></span>
                <span className='hamburger__bar'></span>
                <span className='hamburger__bar'></span>
            </div>
        </nav>
    );
  }
}
